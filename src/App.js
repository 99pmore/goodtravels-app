import { useState, useEffect } from 'react'
import { useRoutes } from "react-router-dom"
import { Login } from "./pages/Login"
import { Home } from "./pages/Home"
import { Register } from './pages/Register'
import { UserContext } from './UserContext'

function App() {
	const [ isLoggedIn, setIsLoggedIn ] = useState(false)
	const [ user, setUser ] = useState(null)

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
	])

	return (
		<UserContext.Provider value={{ user, setUser }}>
			<div className="App">
				{ routes }
			</div>
		</UserContext.Provider>
	)
}

export default App
