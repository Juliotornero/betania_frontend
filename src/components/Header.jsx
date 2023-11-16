import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/imgs/logoName.svg'
import useHabitacion from '../hooks/useHabitacion'
import useAuth from '../hooks/useAuth'
useAuth
const Header = () => {

  const { cerrarSesion} = useHabitacion()
  const { cerrarSesionAuth } = useAuth()

  const handleCerrarSesion = () => { 
    cerrarSesionAuth()
    cerrarSesion()
    localStorage.removeItem('token')
  }

  return (
    <header className='px-4 py-5 bg-gray-900 border-b text-[#d6a0a0] absolute w-full top-0'>

        <div className='flex flex-col justify-center items-center gap-4 md:flex-row md:justify-between'>

            <img src={logo} className='w-[200px]'/>
        
            <div className='flex items-center gap-4 flex-col md:flex-row'>
                <button type='button' className='text-[#d6a0a0] text-sm bg-transparent border border-[#d6a0a0] p-3 rounded-md uppercase font-bold' onClick={handleCerrarSesion}>
                Cerrar Sesion
                </button>
            </div>

            
        </div>
    </header>
  )
}

export default Header