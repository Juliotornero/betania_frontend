import { useState, useEffect } from "react"
import useHabitacion from "../hooks/useHabitacion"
import { useParams } from "react-router-dom"


const FormularioHabitacion = () => {

    const ESTADO = ['disponible', 'ocupada','reservada', 'mantenimiento', 'limpieza']

    const [id, setId] = useState(null)
    const [numero, setNumero] = useState('')
    const [estado, setEstado] = useState('')
    const [tipo, setTipo] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [nota, setNota] = useState('')


    const params = useParams();

    const {submitHabitacion, habitacion } = useHabitacion();

    useEffect(()=>{
        if(params.id){
            setId(habitacion._id)
            setNumero(habitacion.numero)
            setEstado(habitacion.estado)
            setTipo(habitacion.tipo)
            setDescripcion(habitacion.descripcion)
            setNota(habitacion.nota)
        }else{
           
        }
    }, [params])


    const handleSubmit = async (e) =>{
        e.preventDefault()


        await submitHabitacion({id, numero, estado, tipo, descripcion, nota})
        
        setId(null)
        setNumero('')
        setEstado('')
        setTipo('')
        setDescripcion('')
        setNota('')
    }



  return (
    <form className='bg-gray-100 py-10 px-5 md:w-1/2 rounded-lg shadow-md' onSubmit={handleSubmit}>
        <div>
            <label htmlFor="numero" className='text-gray-700 uppercase font-bold text-sm'>
                Numero:
            </label>
            <input 
            id='numero' 
            type="text" 
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md' 
            value={numero}
            onChange={e => setNumero(e.target.value)}
            />
        </div>

          <div className='mt-5 mb-5'>
              <label htmlFor="">ESTADO:</label>
              <select id="MetodoPago" className='border w-full p-2 mt-2' value={estado} onChange={e => setEstado(e.target.value)}>
                  <option value="">-- Seleccionar --</option>
                  {ESTADO.map(opcion => (
                      <option key={opcion}>{opcion}</option>
                  ))}
              </select>
          </div>

          <div>
            <label htmlFor="tipo" className='text-gray-700 uppercase font-bold text-sm'>
                Tipo de Habitacion:
            </label>
            <input 
            id='tipo' 
            type="text" 
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md' 
            value={tipo}
            onChange={e => setTipo(e.target.value)}
            />
        </div>

        <div>
            <label htmlFor="Descripcion" className='text-gray-700 uppercase font-bold text-sm'>
                Descripcion:
            </label>
            <input 
            id='Descripcion' 
            type="text" 
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md' 
            value={descripcion}
            onChange={e => setDescripcion(e.target.value)}
            />
        </div>

        <div>
            <label htmlFor="nota" className='text-gray-700 uppercase font-bold text-sm'>
            Nota:
            </label>
            <input 
            id='nota' 
            type="text" 
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md' 
            value={nota}
            onChange={e => setNota(e.target.value)}
            />
        </div>

        <input type="submit" value={id ? 'Actualizar Habitacion' : 'Crear Habitacion'} className="bg-sky-500 w-full p-3 rounded-lg uppercase font-bold text-white mt-6 cursor-pointer"/>

    </form>
  )
}

export default FormularioHabitacion