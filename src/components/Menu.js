import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/img/logo.webp'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import{ faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'

export const Menu = ({ isLoggedIn, setIsLoggedIn }) => {
    const user = JSON.parse(localStorage.getItem('user'))
    const navigate = useNavigate()

    const logout = () => {
        localStorage.setItem('isLoggedIn', 'false')
        setIsLoggedIn(false)
        localStorage.removeItem('user')
        navigate('/')
    }

    return (
        <nav className='nav-bar' style={{ display: isLoggedIn ? 'flex' : 'none' }}>
            <div className="logo">
                <Link to='/' className='logo-link'>
                    <img src={ logo } alt="Logo" />
                    <h1>goodtravels</h1>
                </Link>
            </div>
            <div className="links">
                <Link to='/' className='link'>Inicio</Link>
                <Link to='/Visited' className='link'>Visitados</Link>
                <Link to='/ToVisit' className='link'>Por visitar</Link>
                <Link to='/Profile' className='link'>Perfil</Link>
                {
                    isLoggedIn && user && (
                        <>
                            <p>Bienvenido, { user.name }</p>
                            <FontAwesomeIcon className='logout' icon={faArrowRightFromBracket} size="lg" style={{color: "#ffffff",}} onClick={ logout } />
                        </>
                    )
                }
            </div>
        </nav>
    )
}