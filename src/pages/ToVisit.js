import { useEffect, useState } from 'react'
import { CountryCardToVisit } from '../components/CountryCardToVisit'
import { Loader } from '../components/Loader'

export const ToVisit = () => {

    const user = JSON.parse(localStorage.getItem('user'))
    const [ countriesToVisit, setCountriesToVisit ] = useState([])

    useEffect(() => {
        fetch(`https://goodtravels-api.up.railway.app/api/users/${user._id}/countriesToVisit`)
        .then(response => response.json())
        .then(jsonResponse => {
            setCountriesToVisit([ ...countriesToVisit, ...jsonResponse ])
        })
    }, [])

    const updateCountries = (countryName) => {
        setCountriesToVisit(countriesToVisit.filter(country => country !== countryName))
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
                        countriesToVisit.length ? (
                            countriesToVisit.map(country => {
                                return <CountryCardToVisit key={ country } country={ country } updateCountries={ updateCountries } />
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