import { formatearFecha } from "../helpers/formatearFecha";
import useHabitacion from "../hooks/useHabitacion";

const Registro = ({registro}) => {

    

    const {handleModalEditarRegistro, handleModalEliminarRegistro, quitarDeuda, finalizarEstancia, errorMessage} = useHabitacion()
    
    const { documento, nombre, apellido, correo, celular, fechaEntrada, fechaSalida, metodoPago, precioTotal, nota, deuda, estado, _id } = registro

  return (
    <>
    
    <div className="flex flex-col justify-center items-center lg:flex-row">

        <div className="lg:mr-20">
           <p className="text-md font-bold">DNI : <span className="text-gray-500">{documento}</span></p>
           <p className="text-md font-bold">NOMBRES : <span className="text-gray-500">{nombre}</span></p>
           <p className="text-md font-bold">APELLIDOS: <span className="text-gray-500">{apellido}</span></p>
           <p className="text-md font-bold">EMAIL : <span className="text-gray-500">{correo}</span></p>
           <p className="text-md font-bold">CELULAR: <span className="text-gray-500">{celular}</span></p>
           <p className="text-md font-bold">FECHA DE ENTRADA : <span className="text-gray-500">{formatearFecha(fechaEntrada)}</span></p>
           <p className="text-md font-bold">FECHA DE SALIDA: <span className="text-gray-500">{formatearFecha(fechaSalida)}</span></p>
           <p className="text-md font-bold">METODO DE PAGO: <span className="text-gray-500">{metodoPago}</span></p>
           <p className="text-md font-bold">PRECIO TOTAL: <span  className="text-gray-500">{precioTotal}</span></p>
           <p className="text-md font-bold mt-3">OBSERVACIONES: <span className="text-gray-500">{nota}</span></p>
           
        </div>

        <div className="flex flex-col justify-center items-center">
            <button onClick={()=> handleModalEditarRegistro(registro)} className="my-2 bg-indigo-600 px-4 py-3 uppercase font-bold rounded-lg text-white">
              Editar Registro
            </button>

  
            <button onClick={()=> finalizarEstancia(_id)}  className="my-2 bg-red-600 px-4 py-3 uppercase font-bold rounded-lg text-white">
                  Finalizar Estancia
            </button>

            {deuda 
              ? 
                (<button onClick={()=> quitarDeuda(_id)} className="my-2 bg-green-600 px-4 py-3 uppercase font-bold rounded-lg text-white">
                  Con Deuda
                </button>) 
              : 
                (<button onClick={()=> quitarDeuda(_id)} className="my-2 bg-gray-600 px-4 py-3 uppercase font-bold rounded-lg text-white">
                  Sin Deudas
                </button>)
            }
            

            {/* <button className="bg-red-600 px-4 py-3 uppercase font-bold rounded-lg text-white" onClick={() => handleModalEliminarRegistro(registro)}>
              Eliminar
            </button> */}
        </div>

    </div>
    
    {errorMessage && <p className="text-white uppercase font-bold text-center p-2 bg-red-600">{errorMessage}</p>}
    </>
  )
}

export default Registro