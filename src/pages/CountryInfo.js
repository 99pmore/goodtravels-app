import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import{ faLink, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2'

export const CountryInfo = () => {

    const user = JSON.parse(localStorage.getItem('user'))
    const location = useLocation()
    const country = location.state.country

    const handleVisitedButton = async () => {
        await fetch(`https://goodtravels-api.up.railway.app/api/users/${user._id}/countriesVisited`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name: country.name})
        })
        .then(() => {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Se ha añadido a tus países visitados',
                showConfirmButton: false,
                timer: 1500
            })
        })
    }

    const handleToVisitButton = async () => {
        await fetch(`https://goodtravels-api.up.railway.app/api/users/${user._id}/countriesToVisit`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name: country.name})
        })
        .then(() => {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Se ha añadido a tus países por visitar',
                showConfirmButton: false,
                timer: 1500
            })
        })
    }

    return(
        <div className="info-container">
            <div className="info">
                <div className="main-info">
                    <div className="flag">
                        <img src={ country.flag } alt={ country.name + ' flag' } />
                    </div>
                    <div className="main-data">
                        <h2>{ country.name }</h2>
                        <h3>Región: { country.region }</h3>
                        <h3>Subregión: { country.subregion }</h3>
                    </div>
                </div>
                <div className="sec-info">
                    <div className="sec-data">
                        <h3>Capital: { country.capital }</h3>
                        <h3>Población: { country.population } habitantes</h3>
                        <Link className='link' to={ country.map }>Google Maps <FontAwesomeIcon icon={ faArrowUpRightFromSquare } /></Link>
                    </div>
                    <div className="buttons">
                        <button onClick={ handleVisitedButton }>Visitado</button>
                        <button onClick={ handleToVisitButton }>Por visitar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}