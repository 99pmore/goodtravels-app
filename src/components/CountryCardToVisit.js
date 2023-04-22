import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

export const CountryCardToVisit = ({ country, updateCountries }) => {

    const user = JSON.parse(localStorage.getItem('user'))
    const [ countries, setCountries ] = useState([])
    const [ countryInfo, setCountryInfo ] = useState(null)

    useEffect(() => {
        getData()
    }, [])

    const getData = () => {
        fetch(`http://localhost:4000/api/countries/${country}`)
        .then(response => response.json())
        .then(jsonResponse => {
            setCountries([ ...countries, ...jsonResponse ])
            setCountryInfo(jsonResponse[0])
        })
    }

    const handleDeleteButton = async () => {
        await fetch(`http://localhost:4000/api/users/${user._id}/countriesToVisit`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name: countryInfo?.name})
        })
        .then(() => {
            updateCountries(countryInfo?.name)

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Se ha eliminado de tus países visitados',
                showConfirmButton: false,
                timer: 1500
            })
        })
    }

    const handleToVisitButton = async () => {
        await fetch(`http://localhost:4000/api/users/${user._id}/countriesVisited`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name: countryInfo?.name})
        })
        .then(() => {
            updateCountries(countryInfo?.name)

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Se ha movido a tus países visitados',
                showConfirmButton: false,
                timer: 1500
            })
        })
    }

    return (
        <div className="card">
            <div className="flag">
                <img src={ countryInfo?.flag } alt={ countryInfo?.name } />
            </div>
            <div className="card-body">
                <h3>{ countryInfo?.name }</h3>
                <h4>{ countryInfo?.region }</h4>
            </div>
            <div className="buttons">
                <button onClick={ handleDeleteButton }>Eliminar</button>
                <button onClick={ handleToVisitButton }>Visitado</button>
            </div>
        </div>
    )
}