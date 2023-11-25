import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Alerta from '../components/Alerta'
import clienteAxios from '../config/clienteAxios'
import useAuth from '../hooks/useAuth'

import logo from '../assets/imgs/logoBlack.svg'
import logoName from '../assets/imgs/logoName.svg'

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alerta, setAlerta] = useState({});

  const { setAuth } = useAuth();

  const handleSubmit = async (e)=>{
    e.preventDefault()

    try {
      //El link de aqui viene desde el routes del back, no confundir con los links del app.jsx
      const { data }= await clienteAxios.post('/usuarios/login', {email, password})
      //guardamos el token en local storage 
      setAlerta({})
      localStorage.setItem('token', data.token)
      setAuth(data)

      navigate('/habitaciones')
      
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error:true
      })

      setTimeout(() => {
        setAlerta(false);
      }, 3000);
    }

 
  }

  const {msg} = alerta

  
  return (
    <>

          <picture className='flex flex-col justify-center items-center lg:mt-10'>
                <img src={logo} className='w-[80px] mb-6' alt="Logo Betania" />
                <img src={logoName} className='w-[240px] mb-6' alt="Logo Betania" />
          </picture>
                    
          {msg && <Alerta alerta={alerta}/>}

          <form className="m-3 p-5 bg-[#f1caca73]  border border-[#d6a0a0] shadow-lg rounded text-center max-w-lg lg:mx-auto" onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="email" className="block mb-2 text-sm font-bold text-gray-600">CORREO:</label>
                <input 
                  type="email" 
                  id="email" 
                  className="border border-[#d6a0a0] text-black text-sm rounded-lg block w-full p-2.5 outline-none" 
                  placeholder="correo@correo.com" 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  />
              </div>

              <div className="mb-6">
                <label htmlFor="password" className="block mb-2 text-sm font-bold text-gray-600">CONTRASEÑA:</label>
                <input 
                  type="password" 
                  id="password" 
                  placeholder='*********'
                  className="border border-[#d6a0a0] text-black text-sm rounded-lg block w-full p-2.5 outline-none" 
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
                
              <input 
              type="submit" 
              className="text-white bg-[#a95959] border border-white  font-medium rounded-lg text-sm w-2/4 px-5 py-2.5 text-center hover:cursor-pointer hover:bg-[#df6d6d]" 
              value="Inicia Sesion"
              />
          </form>

          

          <nav className='lg:flex lg:justify-between  max-w-lg lg:mx-auto'>
            <Link to="registrar" className='block text-center my-5 text-[#d6a0a0] uppercase text-sm'>
            ¿No tienes una cuenta? Registrate
            </Link>

            <Link to="olvide-password" className='block text-center my-5 text-[#d6a0a0] uppercase text-sm'>
              Olvide mi password
            </Link>

            
          </nav>
   
          
          

    </>
  )
}

export default Login