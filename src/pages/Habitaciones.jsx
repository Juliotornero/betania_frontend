import PreviewHabitaciones from '../components/PreviewHabitaciones';
import useHabitacion from '../hooks/useHabitacion'


const Habitaciones = () => {

  const { habitaciones } = useHabitacion()

  return (
    <>
  
    <div className="rounded-md grid grid-cols-1 w-full h-auto md:grid-cols-2 xl:grid-cols-4">

      { 
      habitaciones.map( habitaciones => (
          <PreviewHabitaciones
            key={habitaciones._id}
            habitaciones={habitaciones}
          />
        ))
      }

    </div>
    </>
  )
}

export default Habitaciones