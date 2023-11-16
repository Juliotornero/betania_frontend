import { useParams, Link } from 'react-router-dom'
import { useEffect , useState} from 'react'
import Alerta from '../components/Alerta'
import clienteAxios from '../config/clienteAxios'



const ConfirmarCuenta = () => {

  const [alerta, setAlerta] = useState({});
  
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);

  const params = useParams('');

  const {token} = params

  useEffect(() => {
    const confirmarCuenta = async ()=>{
      try {
      
        const url = `/usuarios/confirmar/${token}`
        const { data } = await clienteAxios(url);

        setAlerta({
          msg: data.msg,
          error: false,
        })
        setCuentaConfirmada(true);
      } catch (error) {

        setAlerta({
          msg:error.response.data.msg,
          error: true
        })
      }
    }
    confirmarCuenta();

  }, [])

  const { msg } = alerta;
  


  return (
    <>
      <h1 className="text-gray-700 font-bold text-6xl text-center pb-10">Confirma tu cuenta</h1>
      <div>
        {msg && <Alerta alerta={alerta} />}
        {cuentaConfirmada && (
              <Link to="/" className='block text-center my-5 text-slate-500 uppercase text-sm'>
              Inicia Sesion
              </Link>
        )}
      </div>
    </>
  )
}

export default ConfirmarCuenta