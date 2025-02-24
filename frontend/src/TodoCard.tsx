
type Props = {
    title: string,
    description: string,
    id: string,
    isComplete: boolean,
    setError: (s: string) => void
    openEdit: (type: string, s: string) => void
    getTasks: () => void
}

export default function TodoCard(props: Props) {
    async function deleteTask(id: string) {
        console.log(id)
        const data = await fetch(`${import.meta.env.VITE_API_URL}/tasks/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": localStorage.getItem("token") || "",
            }
        })

        const json = await data.json()

        if (data.status == 400) {
            props.setError(json.error)
            return
        }

        props.setError(json.message)
        props.getTasks()
        return
    }

    async function markCompleted(id: string) {
        console.log(id)
        const body = { title: props.title, description: props.description, isComplete: !props.isComplete, userId: localStorage.getItem("name") }
        console.log(body)
        const data = await fetch(`${import.meta.env.VITE_API_URL}/tasks/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": localStorage.getItem("token") || "",
            },
            body: JSON.stringify(body)
        })

        const json = await data.json()
        const status = data.status

        if (status == 400) {
            props.setError(json.error)
            return
        }

        props.setError(json.message)
        props.getTasks()
        return
    }

    return (
        <>
            <div className="TodoCard">
                <div className="TodoCard-Titles">
                    <h1 style={{ marginBottom: "5px", marginTop: "0" }}>{props.title}</h1>
                    <p style={{ marginTop: "0" }}>{props.description}</p>
                </div>
                <div className="TodoCard-Buttons">
                    <button style={{ marginBottom: "10px", width: "50px" }} onClick={() => {
                        deleteTask(props.id)
                    }}>Delete</button>
                    <button style={{ marginBottom: "10px", width: "50px" }} onClick={() => {
                        props.openEdit("edit", props.id)
                    }}>Edit</button>
                    {!props.isComplete ?
                        <button onClick={() => {
                            markCompleted(props.id)
                        }}>Completed</button> :
                        <button onClick={() => {
                            markCompleted(props.id)
                        }}>Uncomplete</button>}

                </div>

            </div >
        </>
    )
}