import { useState, useEffect } from "react"
import Swal from 'sweetalert2'

export const Profile = () => {
    
    const user = JSON.parse(localStorage.getItem('user'))
    const [ id, setId ] = useState('')
    const [ name, setName ] = useState('')
    const [ email, setEmail ] = useState('') 
    // const [ oldPassword, setOldPassword ] = useState('')
    // const [ password, setPassword ] = useState('')

    useEffect(() => {
        fetch(`http://localhost:4000/api/users/${user._id}`)
        .then(response => response.json())
        .then(jsonResponse => {
            setId(jsonResponse._id)
            setName(jsonResponse.name)
            setEmail(jsonResponse.email)
        })
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()

        let data = {}

        if (name) {
            data.name = name
        }

        if (email) {
            data.email = email
        }

        // if (password?.length > 0 && oldPassword === user.password) {
        //     data.password = password
        // }

        await fetch(`http://localhost:4000/api/users/${id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(() => {
            const updatedUser = {
                ...user,
                name: data.name || name,
                email: data.email || email
            }
            localStorage.setItem('user', JSON.stringify(updatedUser))

            setName(data.name)
            setEmail(data.email)

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Datos actualizados',
                showConfirmButton: false,
                timer: 1500
            })
        })
    }

     return (
        <div className="profile-container">
            <form onSubmit={ handleSubmit } method='patch' className="profile-form">
                <input type="text" name="name" placeholder="Nombre" value={ name } onChange={ (e) => setName(e.target.value) } />
                <input type="email" name="email" placeholder="Email" value={ email } onChange={ (e) => setEmail(e.target.value) } />
                {/* <input type="password" name="password-old" placeholder="Contraseña anterior" onChange={ (e) => setOldPassword(e.target.value) } />
                <input type="password" name="password" placeholder="Contraseña nueva" onChange={ (e) => setPassword(e.target.value) } /> */}
                <button type="submit">Guardar</button>
            </form>  
        </div>
     )
}