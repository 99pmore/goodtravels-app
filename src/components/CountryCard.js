import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

export const CountryCard = ({ country }) => {

    const user = JSON.parse(localStorage.getItem('user'))

    const handleVisitedButton = async () => {
        await fetch(`http://localhost:4000/api/users/${user._id}/countriesVisited`, {
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
        await fetch(`http://localhost:4000/api/users/${user._id}/countriesToVisit`, {
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

    const navigate = useNavigate()
    const toCountry = () => {
        navigate(`/countries/${country.name}`, 
        { 
            state: { country } 
        })
    }

    return (
        <div className="card">
            <div className="flag" onClick={ toCountry }>
                <img src={ country.flag } alt={ country.name } />
            </div>
            <div className="card-body" onClick={ toCountry }>
                <h3>{ country.name }</h3>
                <h4>{ country.region }</h4>
            </div>
            <div className="buttons">
                <button onClick={ handleVisitedButton }>Visitado</button>
                <button onClick={ handleToVisitButton }>Por visitar</button>
            </div>
        </div>
    )
}