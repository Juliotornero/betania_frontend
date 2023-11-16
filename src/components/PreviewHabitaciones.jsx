import { Link } from "react-router-dom"

const PreviewHabitaciones = ({habitaciones}) => {

    const {_id, numero, estado, descripcion, nota, tipo} = habitaciones

    
    const estadoClases = {
      disponible: 'bg-green-700',
      ocupada: 'bg-red-700',
      mantenimiento: 'bg-yellow-400',
      limpieza: 'bg-blue-300',
      reservada: 'bg-purple-500'
    };

    const buttonClases = {
      disponible: 'bg-green-800',
      ocupada: 'bg-red-800',
      mantenimiento: 'bg-yellow-500',
      limpieza: 'bg-blue-400',
      reservada: 'bg-purple-600'
    };

    const linkClass = estadoClases[estado] || '';

    const linkButtonClass = buttonClases[estado] || '';

  return (
    <>
      <div className={`${linkClass} rounded-md m-5 h-[145px] pt-6 text-white flex flex-col items-center relative overflow-hidden`}>

        <div>
          <p className="text-4xl font-bold mb-1"> 
            Nro: {numero}
          </p>  

          <p className="mb-1">Habitacion {tipo}</p>
        </div>
      
        <Link
          to={`${_id}`}
          className={`font-bold uppercase flex justify-center gap-2 absolute bottom-0 w-full p-1 ${linkButtonClass}`}
        >
        {estado}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </Link>
      </div>
        
    </>
  )
}

export default PreviewHabitaciones