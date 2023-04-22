import { useState, useEffect } from 'react'
import { useRoutes } from "react-router-dom"
import { Login } from "./pages/Login"
import { Home } from "./pages/Home"
import { Register } from './pages/Register'
import { Visited } from './pages/Visited'
import { ToVisit } from './pages/ToVisit'
import { Menu } from './components/Menu'
import { Profile } from './pages/Profile'

function App() {
	const [ isLoggedIn, setIsLoggedIn ] = useState(false)

	useEffect(() => {
		const loggedIn = localStorage.getItem('isLoggedIn')
		if (loggedIn) {
			setIsLoggedIn(true)
		}
	}, [])

	const routes = useRoutes([
		{
			path: '/',
			element: isLoggedIn ? <Home isLoggedIn={ isLoggedIn } /> : <Login setIsLoggedIn={ setIsLoggedIn } />
		},
		{
			path: 'Login',
			element: <Login setIsLoggedIn={ setIsLoggedIn } />
		},
		{
			path: 'Register',
			element: <Register setIsLoggedIn={ setIsLoggedIn } />
		},
		{
			path: 'Home',
			element: <Home isLoggedIn={ isLoggedIn } />
		},
		{
			path: 'Visited',
			element: <Visited isLoggedIn={ isLoggedIn } />
		},
		{
			path: 'ToVisit',
			element: <ToVisit isLoggedIn={ isLoggedIn } />
		},
		{
			path: 'Profile',
			element: <Profile />
		},
	])

	return (
		<div className="App">
			<Menu isLoggedIn={ isLoggedIn } setIsLoggedIn={ setIsLoggedIn } />
			{ routes }
		</div>
	)
}

export default App
