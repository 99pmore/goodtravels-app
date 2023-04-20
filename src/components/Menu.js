import { useContext } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/img/logo.webp'
import { UserContext } from '../UserContext'

export const Menu = ({ isLoggedIn }) => {
    // const { user } = useContext(UserContext)
    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <nav>
            <div className="logo">
                <img src={ logo } alt="Logo" />
                <h1>goodtravels</h1>
            </div>
            <div className="links">
                <Link to='/' className='link'>Inicio</Link>
                <Link to='/Visited' className='link'>Visitados</Link>
                <Link to='/ToVisit' className='link'>Por visitar</Link>
                <Link to='Profile' className='link'>Perfil</Link>
                {
                    isLoggedIn && user && (
                        <p>{ user.name }</p>
                    )
                }
            </div>
        </nav>
    )
}