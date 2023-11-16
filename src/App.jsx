import { BrowserRouter, Routes, Route } from "react-router-dom"

import AuthLayout from "./layouts/AuthLayout"
import RutaProtegida from "./layouts/RutaProtegida"

import Login from "./pages/Login"
import Registrar from "./pages/Registrar"
import OlvidePassword from "./pages/OlvidePassword"
import NuevoPassword from "./pages/NuevoPassword"
import ConfirmarCuenta from "./pages/ConfirmarCuenta"

import Habitaciones from "./pages/Habitaciones"
import Habitacion from "./pages/Habitacion"
import NuevaHabitacion from "./pages/NuevaHabitacion"
import EditarHabitacion from "./pages/EditarHabitacion"
import ListarRegistros from "./pages/ListarRegistros"


import { AuthProvider } from './context/AuthProvider'
import { HabitacionProvider } from "./context/HabitacionProvider"






function App() {

  return (
    <BrowserRouter>
        <AuthProvider>
          <HabitacionProvider>
           
              <Routes>

                <Route path="/" element={<AuthLayout />}>
                  <Route index element={<Login/>}/> 
                  <Route path="registrar" element={<Registrar/>}/> 
                  <Route path="olvide-password" element={<OlvidePassword/>}/> 
                  <Route path="olvide-password/:token" element={<NuevoPassword/>}/> 
                  <Route path="confirmar/:token" element={<ConfirmarCuenta/>}/> 
                </Route>

                
                <Route path="/habitaciones" element={<RutaProtegida />}> 
                  <Route index element={<Habitaciones/>}/> 
                  <Route path="crear-habitacion" element={<NuevaHabitacion/>}/> 
                  <Route path="editar/:id" element={<EditarHabitacion/>}/> 
                  <Route path=":id" element={<Habitacion/>}/>
                  <Route path="listar-registros" element={<ListarRegistros/>}/> 
                </Route>
                
              </Routes>
     
          </HabitacionProvider>
        </AuthProvider>
        
        
    </BrowserRouter>
  )
}

export default App
