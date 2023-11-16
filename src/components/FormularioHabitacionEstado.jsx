import { useState, useEffect } from "react"
import useHabitacion from "../hooks/useHabitacion"
import { useParams } from "react-router-dom"


const FormularioHabitacionEstado = () => {

    const ESTADO = ['disponible', 'ocupada','reservada', 'mantenimiento', 'limpieza']

    const [id, setId] = useState(null)
    const [estado, setEstado] = useState('')


    const params = useParams();

    const {submitHabitacionEstado, habitacion } = useHabitacion();

    useEffect(()=>{
        if(params.id){
            setId(habitacion._id)
            setEstado(habitacion.estado)
        }else{
           
        }
    }, [params])


    const handleSubmit = async (e) =>{
        e.preventDefault()


        await submitHabitacionEstado({id, estado})
        
        setId(null)
        setEstado('')
    }



  return (
    <form className='flex justify-end items-center gap-3' onSubmit={handleSubmit}>
      
          <div className='w-[200px]'>
              <select id="MetodoPago" className='uppercase border-2 w-full p-2' value={estado} onChange={e => setEstado(e.target.value)}>
                  {ESTADO.map(opcion => (
                      <option key={opcion}>{opcion}</option>
                  ))}
              </select>
          </div>

        <input type="submit" value='Actualizar Estado' className="bg-gray-900 w-[200px] p-2 uppercase font-bold text-white cursor-pointer"/>

    </form>
  )
}

export default FormularioHabitacionEstado