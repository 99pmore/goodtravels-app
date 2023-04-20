export const CountryCard = ({ country }) => {

    const user = JSON.parse(localStorage.getItem('user'))

    const handleVisitButton = async () => {

        await fetch(`http://localhost:4000/api/users/${user._id}/countriesVisited`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name: country.name})
        })
    }

    const handleToVisitButton = async () => {
        await fetch(`http://localhost:4000/api/users/${user._id}/countriesToVisit`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name: country.name})
        })
    }

    return (
        <div className="card">
            <div className="flag">
                <img src={ country.flag } alt={ country.name } />
            </div>
            <div className="card-body">
                <h3>{ country.name }</h3>
                <h4>{ country.region }</h4>
            </div>
            <div className="buttons">
                <button onClick={ handleVisitButton }>Visitado</button>
                <button onClick={ handleToVisitButton }>Por visitar</button>
            </div>
        </div>
    )
}