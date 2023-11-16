import { Link, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Alerta from '../components/Alerta'
import clienteAxios from '../config/clienteAxios'


const NuevoPassword = () => {
  const [password, setPassword] = useState('');
  const [tokenValido, setTokenValido] = useState(false);
  const [alerta, setAlerta] = useState({});
  const params = useParams();
  const {token} = params;
  const [passwordModificado, setPasswordModificado] = useState(false);
  useEffect(()=>{
    const comprobarToken = async ( ) =>{
      try {
        await clienteAxios(`/usuarios/resetPassword/${token}`);
        setTokenValido(true);
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
      }
    }
    comprobarToken();
  }, []);

  const handleSubmit = async e =>{
    e.preventDefault();
    if(password.length < 6 ){
      setAlerta({
        msg: "El password debe tener minimo 6 caracteres",
        error: true
      })
    }

    try {
      const url = `/usuarios/resetPassword/${token}`
      const { data } = await clienteAxios.post(url, { password })
      setAlerta({
        msg: data.msg,
        error: false
      })
      setPassword('')
      setPasswordModificado(true);
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }
  const { msg } = alerta;

  return (
    <>
      <h1 className="text-sky-600 font-bold text-6xl text-center pb-10">Restablece tu Password</h1>
      
      {msg && <Alerta alerta={alerta}/>}

      {tokenValido && (
        <form className="px-4" onSubmit={handleSubmit}>

        <div className="mb-6">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Nueva Password :</label>
          <input 
          type="password" 
          id="password" 
          className="bg-white border border-gray-300 text-gray-700 text-sm rounded-lg block w-full p-2.5" 
          placeholder='Nuevo Password' 
          value={password}
          onChange={e => setPassword(e.target.value )}
          />
        </div>            
        <input type="submit" className="text-white bg-blue-700  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center hover:cursor-pointer" value="Cambiar Password"/>
        </form>
      )}
        

      
      {passwordModificado && (
        <Link to="/" className='block text-center my-5 text-slate-500 uppercase text-sm'>
          Inicia Sesion
        </Link>
      )}
      
  

    </>
  )
}

export default NuevoPassword