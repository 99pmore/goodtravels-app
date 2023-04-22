import { useEffect, useState } from 'react'
import { CountryCardVisited } from '../components/CountryCardVisited'
import { Loader } from '../components/Loader'

export const Visited = () => {

    const user = JSON.parse(localStorage.getItem('user'))
    const [ countriesVisited, setCountriesVisited ] = useState([])

    useEffect(() => {
        fetch(`http://localhost:4000/api/users/${user._id}/countriesVisited`)
        .then(response => response.json())
        .then(jsonResponse => {
            setCountriesVisited([ ...countriesVisited, ...jsonResponse ])
        })
    }, [])

    const updateCountries = (countryName) => {
        setCountriesVisited(countriesVisited.filter(country => country !== countryName))
    }

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
                        countriesVisited.length ? (
                            countriesVisited.map(country => {
                                return <CountryCardVisited key={ country } country={ country } updateCountries={ updateCountries } />
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