import { useEffect, useState } from 'react'
import { Menu } from '../components/Menu'
import { CountryCard } from '../components/CountryCard'

export const Home = ({ isLoggedIn }) => {

    const [ countries, setCountries ] = useState([])

    useEffect(() => {
        fetch('http://localhost:4000/api/countries')
        .then(response => response.json())
        .then(jsonResponse => {
            setCountries([ ...countries, ...jsonResponse ])
        })
    }, [])

    return (
        <>
            <Menu isLoggedIn={ isLoggedIn } />
            <main className='home-main'>
                <div className="container">
                    {
                        countries.map(country => {
                            return <CountryCard key={ country.name } country={ country } />
                        })
                    }
                </div>
            </main>
        </>
    )
}