import { useEffect, useState } from 'react'
import { CountryCard } from '../components/CountryCard'
import { Loader } from '../components/Loader'

export const Home = () => {

    const [ countries, setCountries ] = useState([])

    useEffect(() => {
        fetch('https://goodtravels-api.up.railway.app/api/countries')
        .then(response => response.json())
        .then(jsonResponse => {
            setCountries([ ...countries, ...jsonResponse ])
        })
    }, [])

    const renderLoader = () => {
        const loaders = []

        for (let i = 0; i < 16; i++) {
            loaders.push(<Loader key={ i } />)
        }

        return loaders
    }

    return (
        <>
            <main className='home-main'>
                <div className="container">
                    {
                        countries.length ? (
                            countries.map(country => {
                                return <CountryCard key={ country.name } country={ country } />
                            })
                        ) : (
                            renderLoader()
                        )
                    }
                </div>
            </main>
        </>
    )
}