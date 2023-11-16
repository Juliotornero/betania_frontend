import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const Sidebar = () => {

  const { auth } = useAuth()


  return (
    <>


      <aside className='flex flex-col items-center w-[300px] h-full bg-[#faf7f2] shadow-2xl mx-auto text-black relative'>

        <Link to="/habitaciones" className='flex gap-2  p-3 m-3 text-black border-b-2 w-full text-left'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
          </svg>

          RECEPCION
        </Link>

        <Link to="listar-registros" className="flex gap-2 p-3 m-3 text-black border-b-2 w-full text-left">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
          </svg>

          REGISTROS
        </Link>


        <p className="pt-10 pl-3 w-full text-sm text-gray-600">Control de habitaciones</p>
        <Link to="crear-habitacion" className="flex gap-2  p-3 m-3 text-black border-b-2 w-full text-left">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>

          CREAR HABITACION
        </Link>

        <p className="text-sm font-bold pt-2 pb-2 uppercase absolute bottom-0 flex justify-center items-center gap-2 bg-gray-200 w-full">
          <span className="px-3 py-2 bg-sky-600 rounded-[50%] text-white">{auth.username[0]}</span>
          {auth.username}
        </p>

      </aside>
    </>
  )
}

export default Sidebar