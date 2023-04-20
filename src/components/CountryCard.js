export const CountryCard = ({ country }) => {

    const handleToVisitButton = () => {
        
    }

    const handleVisitButton = () => {

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
                <button onClick={ handleToVisitButton }>Por visitar</button>
                <button onClick={ handleVisitButton }>Visitado</button>
            </div>
        </div>
    )
}