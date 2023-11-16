import { Outlet } from "react-router-dom"



const AuthLayout = () => {
  return (
    <>
        <main className="container mx-auto pt-5 md:flex md:justify-center">
            <div className="md:w-2/3">
                <Outlet/>
            </div>
        </main>
    </>
  )
}

export default AuthLayout