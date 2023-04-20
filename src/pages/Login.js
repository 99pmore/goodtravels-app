import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import logo from '../assets/img/logo.webp'

export const Login = ({ setIsLoggedIn }) => {

    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()

        await fetch('http://localhost:4000/api/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
        .then((response) => {
            if(response.ok) {
                localStorage.setItem('isLoggedIn', 'true')
                setIsLoggedIn(true)
                navigate('/')
            } else {
                alert('Error')
                throw new Error('Failed to login')
            }
        })
        .catch((error) => {
            alert('Error: ', error)
        })
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