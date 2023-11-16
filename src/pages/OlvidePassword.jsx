import { useState } from 'react'
import { Link } from 'react-router-dom'
import Alerta from '../components/Alerta';
import clienteAxios from '../config/clienteAxios';

import logo from '../assets/imgs/logoBlack.svg'
import logoName from '../assets/imgs/logoName.svg'

const OlvidePassword = () => {

  const [email, setEmail] = useState('');
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    try {
      const { data } = await clienteAxios.post(`/usuarios/resetPassword`, { email });
      console.log(data)

      setAlerta({
        msg: data.msg,
        error: false
      })

    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
      setTimeout(() => {
        setAlerta(false);
      }, 3000);
    }
  }


  const { msg } = alerta;

  return (
    <>

      <picture className='flex flex-col justify-center items-center lg:mt-10'>
        <img src={logo} className='w-[80px] mb-6' alt="Logo Betania" />
        <img src={logoName} className='w-[240px] mb-6' alt="Logo Betania" />
      </picture>
      <h1 className="text-gray-700 font-bold text-xl text-center pb-10">Recupera tu cuenta</h1>

      {msg && <Alerta alerta={alerta} />}

      <form className="m-3 p-5 bg-[#f1caca73]  border border-[#d6a0a0] shadow-lg rounded text-center max-w-lg lg:mx-auto" onSubmit={handleSubmit}>

        <div className="mb-6">
          <label htmlFor="email" className="block mb-2 text-sm font-bold text-gray-600 uppercase">Email :</label>
          <input
            type="email"
            id="email"
            className="border border-[#d6a0a0] text-black text-sm rounded-lg block w-full p-2.5 outline-none"
            placeholder="name@flowbite.com"
            value={email}
            required
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <input type="submit" className="text-white bg-[#a95959] border border-white  font-medium rounded-lg text-sm w-2/4 px-5 py-2.5 text-center hover:cursor-pointer" value="Enviar" />
      </form>

      <nav className='lg:flex lg:justify-between  max-w-lg lg:mx-auto'>
        <Link to="/" className='block text-center my-5 text-[#d6a0a0] uppercase text-sm'>
          Tienes una cuenta? Inicia Sesion
        </Link>
      </nav>


    </>
  )
}

export default OlvidePassword