import { useState, useEffect } from 'react'
import { useRoutes } from "react-router-dom"
import { Login } from "./pages/Login"
import { Home } from "./pages/Home"
import { Register } from './pages/Register'

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
			element: isLoggedIn ? <Home /> : <Login setIsLoggedIn={ setIsLoggedIn } />
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
			element: <Home />
		},
	])

	return (
		<div className="App">
			{ routes }
		</div>
	)
}

export default App
