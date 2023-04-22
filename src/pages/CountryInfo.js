import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import{ faLink, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'

export const CountryInfo = () => {

    const location = useLocation()
    const country = location.state.country

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
                    <h3>Capital: { country.capital }</h3>
                    <h3>Población: { country.population } habitantes</h3>
                    <Link className='link' to={ country.map }>Google Maps <FontAwesomeIcon icon={ faArrowUpRightFromSquare } /></Link>
                </div>
            </div>
        </div>
    )
}