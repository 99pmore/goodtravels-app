import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import logo from '../assets/img/logo.webp'

export const Register = ({ setIsLoggedIn }) => {

    const [ name, setName ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()

        await fetch('http://localhost:4000/api/users', {
            method: 'POST',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
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
            alert(`Error: ${error.message}`)
        })
    }

    return (
        <main className='register-main'>
            <div className="bg-reg"></div>
            <div className="container-reg">
                <div className="form-reg">
                    <form onSubmit={ handleLogin } method='post'>
                        <input type='text' name='name' placeholder='Nombre' value={ name } onChange={ (e) => setName(e.target.value) } />
                        <input type='email' name='email' placeholder='Email' value={ email } onChange={ (e) => setEmail(e.target.value) } />
                        <input type='password' name='password' placeholder='Contraseña' value={ password } onChange={ (e) => setPassword(e.target.value) } />
                        <button type="subtmit">Registrarse</button>
                    </form>
                    <p>¿Ya tienes cuenta? <Link className='link-reg' to="/Login">Inicia sesión</Link></p>
                </div>
                <div className="logo-reg">
                    <img src={ logo } alt="Logo" />
                </div>
            </div>
        </main>
    )
}