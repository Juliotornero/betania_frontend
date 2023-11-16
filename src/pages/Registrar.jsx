import { useState } from 'react'
import { Link } from 'react-router-dom'
import Alerta from '../components/Alerta'
import clienteAxios from '../config/clienteAxios'

import logo from '../assets/imgs/logoBlack.svg'
import logoName from '../assets/imgs/logoName.svg'

const Registrar = () => {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repetirPassword, setRepetirPassword] = useState('');
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([nombre, email, password, repetirPassword].includes('')) {
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      })
      return
    }

    if (password !== repetirPassword) {
      setAlerta({
        msg: 'Los Passwords no son iguales',
        error: true
      })
    }

    if (password.length < 6) {
      setAlerta({
        msg: 'Password muy corta, agrega minimo 6 caracteres',
        error: true
      })
    }

    setAlerta({})

    //Crear usuario en API
    try {

      const { data } = await clienteAxios.post(`/usuarios`, { username, email, password })

      setAlerta({
        msg: data.msg,
        error: false
      })

      setUsername('')
      setEmail('')
      setPassword('')
      setRepetirPassword('')

    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })

    }
  }

  const { msg } = alerta

  return (
    <>
      <picture className='flex flex-col justify-center items-center lg:mt-10'>
        <img src={logo} className='w-[80px] mb-6' alt="Logo Betania" />
        <img src={logoName} className='w-[240px] mb-6' alt="Logo Betania" />
      </picture>

      {msg && <Alerta alerta={alerta} />}

      <form
        className="m-3 p-5 bg-[#f1caca73]  border border-[#d6a0a0] shadow-lg rounded text-center max-w-lg lg:mx-auto"
        onSubmit={handleSubmit}
      >

        <div className="mb-6">
          <label htmlFor="nombre" className="block mb-2 text-sm font-medium text-gray-900">Nombre :</label>
          <input
            type="text"
            id="nombre"
            className="bg-white border border-gray-300 text-gray-700 text-sm rounded-lg block w-full p-2.5 outline-none"
            placeholder="Ejem. Juan Alberto"
            //required
            value={username}
            onChange={e => setUsername(e.target.value)}
          />


        </div>

        <div className="mb-6">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email :</label>
          <input
            type="email"
            id="email"
            className="bg-white border border-gray-300 text-gray-700 text-sm rounded-lg block w-full p-2.5 outline-none"
            placeholder="correo@correo.com"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password :</label>
          <input
            type="password"
            id="password"
            className="bg-white border border-gray-300 text-gray-700 text-sm rounded-lg block w-full p-2.5 outline-none"
            placeholder='***********'
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label htmlFor="rpassword" className="block mb-2 text-sm font-medium text-gray-900">Repetir Password :</label>
          <input
            type="password"
            id="rpassword"
            className="bg-white border border-gray-300 text-gray-700 text-sm rounded-lg block w-full p-2.5 outline-none"
            placeholder='***********'
            required
            value={repetirPassword}
            onChange={e => setRepetirPassword(e.target.value)}
          />
        </div>

        <input
          type="submit"
          className="text-white bg-[#a95959] border border-white  font-medium rounded-lg text-sm w-2/4 px-5 py-2.5 text-center hover:cursor-pointer outline-none"
          value="Crear cuenta" />
      </form>

      <nav className='lg:flex lg:justify-between  max-w-lg lg:mx-auto'>
            <Link to="/" className='block text-center my-5 text-[#d6a0a0] uppercase text-sm'>
            ¿Ya tienes cuenta? Ingresa
            </Link>

            <Link to="/olvide-password" className='block text-center my-5 text-[#d6a0a0] uppercase text-sm'>
              Olvide mi password
            </Link>
          </nav>


    </>
  )
}

export default Registrar