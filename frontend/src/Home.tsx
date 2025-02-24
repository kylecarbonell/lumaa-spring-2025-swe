import { useEffect, useState } from 'react'
import './Home.css'
import { useNavigate } from 'react-router'
import TodoCard from './TodoCard.js'

type Todo = {
    description: string,
    id: string,
    isComplete: boolean,
    title: string,
    userId: string
}

function Home() {
    const nav = useNavigate()

    const [todos, setTodos] = useState<Todo[]>()
    const [error, setError] = useState("")
    const [show, setShow] = useState(false)

    const [id, setId] = useState("")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [isComplete, setComplete] = useState<boolean>(false)

    async function getTasks() {
        const token = localStorage.getItem("token") || ""
        const data = await fetch(`${import.meta.env.VITE_API_URL}/tasks?user=${localStorage.getItem("name")}`, {
            headers: {
                "Authorization": token
            }
        })
        const json = await data.json()
        setTodos(json.tasks)
    }

    function openEdit(type: string, currId: string) {
        if (type == "edit") {
            todos?.forEach((val) => {
                if (val.id == currId) {
                    setTitle(val.title)
                    setDescription(val.description)
                    setComplete(val.isComplete)
                }
            })
        } else {
            setTitle("")
            setDescription("")
            setComplete(false)
        }
        setId(currId)
        setShow(true)
    }

    async function createTask() {
        const body = { title: title, description: description, isComplete: isComplete, userId: localStorage.getItem("name") }
        console.log(body)
        const data = await fetch(`${import.meta.env.VITE_API_URL}/tasks`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": localStorage.getItem("token") || ""
            },
            body: JSON.stringify(body)
        })

        const json = await data.json()
        const status = data.status
        setShow(false)

        if (status == 400) {
            setError(json.error)
            return
        }

        setError(json.message)
        getTasks()
        return
    }

    async function editTask(id: string) {
        const body = { title: title, description: description, isComplete: isComplete, userId: localStorage.getItem("name") }
        console.log(body)
        const data = await fetch(`${import.meta.env.VITE_API_URL}/tasks/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": localStorage.getItem("token") || ""
            },
            body: JSON.stringify(body)
        })

        const json = await data.json()
        const status = data.status
        setShow(false)

        if (status == 400) {
            setError(json.error)
            return
        }

        setError(json.message)
        getTasks()
        return
    }

    function logout() {
        window.localStorage.removeItem("name")
        window.localStorage.removeItem("token")
        nav("/")
    }

    useEffect(() => {
        const int = setInterval(() => {
            setError("")
        }, 5000)

        if (!localStorage.getItem("token")) {
            nav("/")
        }

        getTasks()


        return () => clearInterval(int)
    }, [])

    useEffect(() => {
        console.log("THIS IS TODOS", todos)
    }, [todos])


    return (
        <>
            <div className='Outline'>
                <div className='Nav'>
                    <h1 style={{ marginLeft: "50px" }}>Todo List</h1>
                    <button style={{ height: "80%", width: "120px", marginRight: "50px" }} onClick={() => {
                        logout()
                    }}>Logout</button>
                </div>

                <div className='MessageContainer'>
                    <h1 style={{ height: "35px" }}>{error}</h1>
                </div>

                <h1 style={{ height: "35px" }}>Incomplete</h1>
                <div className='TodoContainer'>
                    {todos?.map((val: Todo, key: number) => {
                        if (!val.isComplete) {
                            return <TodoCard
                                title={val.title}
                                description={val.description}
                                id={val.id}
                                isComplete={val.isComplete}
                                setError={setError}
                                key={key}
                                openEdit={openEdit}
                                getTasks={getTasks}
                            ></TodoCard>
                        }

                    })}
                </div>
                <h1 style={{ height: "35px" }}>Completed</h1>
                <div className='TodoContainer'>
                    {todos?.map((val: Todo, key: number) => {
                        if (val.isComplete) {
                            return <TodoCard
                                title={val.title}
                                description={val.description}
                                id={val.id}
                                setError={setError}
                                isComplete={val.isComplete}
                                key={key}
                                openEdit={openEdit}
                                getTasks={getTasks}
                            ></TodoCard>
                        }
                    })}
                </div>
                <button style={{ height: "50px", width: "50%", marginBottom: "50px" }} onClick={() => {
                    openEdit("create", "")
                }}>Create Task</button>

            </div >

            {
                show &&
                <div className='Popup-Container'>
                    <div className='Popup'>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <h1 style={{ marginLeft: "20px" }}>Create/Edit Task</h1>
                            <span style={{ fontSize: "35px", marginRight: "25px" }} onClick={() => {
                                setShow(false)
                            }}>X</span>
                        </div>
                        <form className='Popup-Body'>
                            <input placeholder='Title' style={{ height: '50px' }} value={title} onChange={(e) => {
                                setTitle(e.currentTarget.value)
                            }} />
                            <input placeholder='description' style={{ height: '50px' }} value={description} onChange={(e) => {
                                setDescription(e.currentTarget.value)
                            }} />


                            <button onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                                e.preventDefault()
                                console.log(id)
                                if (!id) {

                                    createTask()
                                } else {
                                    editTask(id)
                                }
                            }}>Submit</button>
                        </form>
                    </div>
                </div>
            }

        </>
    )
}

export default Home;

