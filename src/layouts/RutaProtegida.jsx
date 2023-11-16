import { Outlet, Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import Spinner from "../components/Spinner"


const RutaProtegida = () => {

    const { auth, cargando} = useAuth()
    
    if(cargando) return <Spinner/>
    
  return (
    <>
    {auth._id ? 
      (
        <div className="bg-[#faf7f2] w-full">
            <Header/>
            <div className="md:flex pt-52 md:pt-28 w-full h-screen">
                <Sidebar/>

                <main className="flex-1 h-full overflow-y-auto">
                  <Outlet/>
                </main>
            </div>
           
        </div>
      )
    
    : <Navigate to="/"/>}
    
    </>
  )
}

export default RutaProtegida