import { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import logo from '../assets/img/logo.webp'
import { UserContext } from '../UserContext'

export const Login = ({ setIsLoggedIn }) => {

    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const navigate = useNavigate()
    const { setUser } = useContext(UserContext)

    const handleLogin = async (e) => {
        e.preventDefault()

        await fetch('http://localhost:4000/api/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
        .then(async response => {
            if(response.ok) {
                const searchedUser = await getUserByEmail(email)
                setUser(searchedUser)
                localStorage.setItem('user', JSON.stringify(searchedUser))

                localStorage.setItem('isLoggedIn', 'true')
                setIsLoggedIn(true)
                navigate('/')

            } else {
                alert('Error')
            }
        })
        .catch(error => {
            alert(`Error: ${error.message}`)
        })
    }

    const getUserByEmail = async (email) => {
        const response = await fetch(`http://localhost:4000/api/users/email/${email}`)

        if (!response.ok) {
            alert('Failed to get user by email')
        }
      
        const user = await response.json()
        return user
    }

    return (
        <main className='login-main'>
            <div className="bg"></div>
            <div className="container">
                <div className="logo">
                    <img src={ logo } alt="Logo" />
                </div>
                <div className="form">
                    <form onSubmit={ handleLogin } method='post'>
                        <input type='email' name='email' placeholder='Email' value={ email } onChange={ (e) => setEmail(e.target.value) } />
                        <input type='password' name='password' placeholder='Contraseña' value={ password } onChange={ (e) => setPassword(e.target.value) } />
                        <button type="subtmit">Iniciar Sesión</button>
                    </form>
                    <p>¿No tienes cuenta? <Link className='link' to="/Register">Regístrate</Link></p>
                </div>
            </div>
        </main>
    )
}