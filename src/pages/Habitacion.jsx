import { useParams, Link } from 'react-router-dom'
import useHabitacion from '../hooks/useHabitacion'
import { useEffect, useState } from 'react'
import ModalFormularioRegistros from '../components/ModalFormularioRegistros'
import Registro from '../components/Registro'
import ModalEliminarRegistro from '../components/ModalEliminarRegistro'
import Spinner from "../components/Spinner"
import FormularioHabitacionEstado from '../components/FormularioHabitacionEstado'

const Habitacion = () => {

  const params = useParams();
  const { obtenerHabitacion, habitacion, cargando, handleModalRegistro } = useHabitacion();

  useEffect(() => {
    obtenerHabitacion(params.id)
  }, [])

  const { numero, descripcion, nota, tipo, estado } = habitacion

  return (

    cargando

      ?
      <Spinner />

      :

      (
        <>
          <div className='bg-[#faf7f2] text-gray-700 shadow-md mt-5 p-3 w-auto h-auto flex flex-col mx-4'>

            <div className='p-4 font-bold uppercase'>
              <div className='flex flex-col justify-between items-center mb-5 md:flex-row'>
                <h1 className='font-bold uppercase text-xl text-[#cf9696] text-center'>detalles de habitacion</h1><br />
                <div className='flex gap-1 justify-center items-center font-bold'>

                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                  </svg>

                  <Link to={`/habitaciones/editar/${params.id}`}>
                    Editar Habitacion
                  </Link>

                </div>
              </div>

              <p className='text-[#d6a0a0]'>Numero: <span className='text-gray-600'>{numero}</span></p>
              <p className='text-[#d6a0a0]'>Tipo de Habitacion: <span className='text-gray-600'>{tipo}</span></p>
              <p className='text-[#d6a0a0]'>Descripcion: <span className='text-gray-600'>{descripcion}</span></p>
              <p className='text-[#d6a0a0]'>Nota: <span className='text-gray-600'>{nota}</span></p>
              <p className='text-[#d6a0a0]'>Estado: <span className='text-gray-600'>{estado}</span></p>


              <div className='mt-4'>
                <FormularioHabitacionEstado />
              </div>
            </div>

          </div>


          <div className='mx-4 flex flex-col justify-center items-center'>

            <p className='font-bold text-xl mt-10 mb-5 uppercase text-center'>Registro actual</p>


            {habitacion && habitacion.registros && habitacion.registros.length > 0
              ?
              null
              :
              <button onClick={handleModalRegistro} type='button' className='flex gap-2 justify-center items-center p-2 m-3 text-[#d6a0a0] bg-gray-900 shadow-md rounded-md w-[250px] text-center'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Nuevo registro
              </button>
            }



            <div className='bg-white shadow mt-10 rounded-lg mb-10 overflow-hidden p-4'>

              {habitacion.registros?.length
                ?

                habitacion.registros?.map(registro => (
                  <Registro
                    key={registro._id}
                    registro={registro}
                  />
                ))
                :
                <p className='text-center my-5'>No hay registros.</p>
              }

            </div>
          </div>


          <ModalFormularioRegistros />
          <ModalEliminarRegistro />
        </>
      )
  )
}

export default Habitacion