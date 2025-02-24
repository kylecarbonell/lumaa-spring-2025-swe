import { useEffect, useState } from 'react'
import './Home.css'
import { useNavigate } from 'react-router'

export default function App() {
  const nav = useNavigate()

  const [error, setError] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  async function signup() {
    const b = { username: username, password: password }
    console.log("REGISTER", b)
    const data = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(b)
    })

    const json = await data.json()
    const status = data.status

    if (status == 400) {
      setError(json.error)
      return
    }

    localStorage.setItem("token", json.token)
    localStorage.setItem("name", username)
    nav("/home")
  }

  async function login() {
    const b = { username: username, password: password }
    console.log("LOGIN", b)
    const data = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(b)
    })

    if (!data.ok) {
      setError("Error logging in")
      return
    }

    const json = await data.json()
    const status = data.status

    if (status == 401) {
      setError(json.error)
      return
    }

    localStorage.setItem("token", json.token)
    localStorage.setItem("name", username)
    nav("/home")
  }

  useEffect(() => {
    if (localStorage.getItem("token") != null && localStorage.getItem("name") != null) {
      nav("/home")
    }
  })

  useEffect(() => {
    const int = setInterval(() => {
      setError("")
    }, 5000)

    return () => clearInterval(int)
  }, [error])

  return (
    <>
      <div className='Outline'>
        <div className='Main'>
          <form className='LoginForm' onSubmit={(e) => {
            e.preventDefault()
          }}>
            <h1>Login to create your todo list now!</h1>
            <input type='text' placeholder='Username' onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
              setUsername(e.currentTarget.value)
            }} />
            <input type='password' placeholder='Password' onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
              setPassword(e.currentTarget.value)
            }} />
            {
              error != "" && <h1 style={{ fontSize: "20px", fontWeight: "3px" }}>{error}</h1>
            }

            <div className='Buttons'>
              <button onClick={() => {
                signup()
              }} >Sign Up</button>
              <button onClick={() => {
                login()
              }}>Login</button>
            </div>
          </form>
        </div >
      </div >
    </>
  )
}