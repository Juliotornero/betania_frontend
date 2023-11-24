import { useState, useEffect, createContext } from 'react'
import clienteAxios from '../config/clienteAxios'
import { useNavigate, useNavigation } from "react-router-dom"
import useAuth from '../hooks/useAuth';

const HabitacionContext = createContext();

const HabitacionProvider = ({ children }) => {

    const [habitaciones, setHabitaciones] = useState([])

    const [habitacion, setHabitacion] = useState({})
    const [cargando, setCargando] = useState(false)
    const [modalFormularioRegistro, setModalFormularioRegistro] = useState(false)

    const [registro, setRegistro] = useState({})

    const [registros, setRegistros] = useState([])

    const [modalEliminarRegistro, setModalEliminarRegistro] = useState(false)

    const [errorMessage, setErrorMessage] = useState('');


    const [buscador, setBuscador] = useState(false);

    const navigate = useNavigate()
    const {auth} = useAuth()

    useEffect(() => {
        const obtenerHabitaciones = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return

                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const { data } = await clienteAxios('/habitaciones', config)

                setHabitaciones(data)

            } catch (error) {
                console.log(error);
            }


        }

        obtenerHabitaciones()
    }, [auth])


    const submitHabitacion = async habitacion => {
        if (habitacion.id) {
            await editarHabitacion(habitacion)
        } else {
            await crearHabitacion(habitacion)
        }
    }

    const submitHabitacionEstado = async habitacion => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.put(`/habitaciones/${habitacion.id}`, habitacion, config)

            //Sincronizar state
            const habitacionActualizada = habitaciones.map(habitacionState => habitacionState._id === data._id ? data : habitacionState)
            setHabitaciones(habitacionActualizada)


            navigate('/habitaciones')


        } catch (error) {
            console.log(error)
        }
    }

    const editarHabitacion = async habitacion => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.put(`/habitaciones/${habitacion.id}`, habitacion, config)

            //Sincronizar state
            const habitacionActualizada = habitaciones.map(habitacionState => habitacionState._id === data._id ? data : habitacionState)
            setHabitaciones(habitacionActualizada)


            navigate('/habitaciones')


        } catch (error) {
            console.log(error)
        }
    }

    const crearHabitacion = async habitacion => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.post('/habitaciones', habitacion, config)

            setHabitaciones([...habitaciones, data])


            navigate('/habitaciones')


        } catch (error) {
            console.log(error)
        }
    }

    const eliminarHabitacion = async id => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }


            const { data } = await clienteAxios.delete(`/habitaciones/${id}`, config)
            const habitacionActualizada = habitaciones.filter(habitacionState => habitacionState._id !== id)
            setHabitaciones(habitacionActualizada)
            navigate('/habitaciones')


        } catch (error) {
            console.log(error)
        }
    }

    const obtenerHabitacion = async id => {
        setCargando(true)
        try {
            const token = localStorage.getItem('token');
            if (!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios(`/habitaciones/${id}`, config)

            setHabitacion(data)
        } catch (error) {
            console.log(error);
        }
        setCargando(false)
    }

    const handleModalRegistro = () => {
        setModalFormularioRegistro(!modalFormularioRegistro)
        setRegistro({})
    }

    const submitRegistro = async registro => {
        if (registro?.id) {
            await editarRegistro(registro);
        } else {
            delete registro.id;
            // Pasa el tipo de registro al crear el registro
            await crearRegistro(registro, registro.tipoRegistro);
        }
    }

    const actualizarEstadoHabitacion = async (nuevoEstado) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            };


            const habitacionId = habitacion._id;

            const { data } = await clienteAxios.put(`/habitaciones/${habitacionId}`, { estado: nuevoEstado }, config);

            const habitacionActualizada = habitaciones.map(habitacionState => habitacionState._id === data._id ? data : habitacionState)
            setHabitaciones(habitacionActualizada)


            navigate('/habitaciones')

        } catch (error) {
            console.log(error);
        }
    };

    const crearRegistro = async (registro, tipoRegistro) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;
    
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
    
            const { data } = await clienteAxios.post('/registros', registro, config);
    
            // Agregando registro al state
            const habitacionActualizada = { ...habitacion };
            habitacionActualizada.registros = [...habitacion.registros, data];
            setHabitacion(habitacionActualizada);
    
            // Si el tipo de registro es "reservar", actualizar el estado a "reservada"
            if (tipoRegistro === 'reservar') {
                await actualizarEstadoHabitacion('reservada');
            } else {
                // Si no, actualizar el estado a "ocupada"
                await actualizarEstadoHabitacion('ocupada');
            }
    
            setModalFormularioRegistro(false);
        } catch (error) {
            console.log(error);
        }
    }

    const editarRegistro = async registro => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.put(`/registros/${registro.id}`, registro, config)


            const habitacionActualizado = { ...habitacion }
            habitacionActualizado.registros = habitacionActualizado.registros.map(registroState => registroState._id === data._id ? data : registroState)


            setHabitacion(habitacionActualizado)
            setModalFormularioRegistro(false)

        } catch (error) {
            console.log(error)
        }
    }

    const handleModalEditarRegistro = registro => {
        setRegistro(registro)
        setModalFormularioRegistro(true)
    }

    const handleModalEliminarRegistro = registro => {
        setRegistro(registro)
        setModalEliminarRegistro(!modalEliminarRegistro)
    }

    const eliminarRegistro = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.delete(`/registros/${registro._id}`, config)


            const habitacionActualizado = { ...habitacion }
            habitacionActualizado.registros = habitacionActualizado.registros.filter(registroState => registroState._id !== registro._id)


            setHabitacion(habitacionActualizado)
            setModalEliminarRegistro(false)
            setRegistro({})
        } catch (error) {
            console.log(error)
        }
    }

    const quitarDeuda = async id => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.post(`/registros/deuda/${id}`, {}, config)

            const habitacionActualizado = { ...habitacion }
            habitacionActualizado.registros = habitacionActualizado.registros.map(registroState => registroState._id === data._id ? data : registroState)
            setHabitacion(habitacionActualizado)
            setRegistro({})

        } catch (error) {
            console.log(error)
        }
    }

    const finalizarEstancia = async id => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.post(`/registros/estado/${id}`, {}, config);

            if (data.deuda === false) {

                await actualizarEstadoHabitacion('disponible');

                const habitacionActualizado = { ...habitacion };
                habitacionActualizado.registros = habitacionActualizado.registros.filter(
                    (registroState) => registroState._id !== id
                );
                setHabitacion(habitacionActualizado);
            } else {
                setErrorMessage('No se puede finalizar la estancia si el Huesped tiene deudas activas');
            }

        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        if (errorMessage) {
            const timeoutId = setTimeout(() => {
                setErrorMessage('');
            }, 3000);

            return () => {
                clearTimeout(timeoutId);
            };
        }
    }, [errorMessage]);

    useEffect(() => {
    const obtenerRegistrosDeTodasLasHabitaciones = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            };

            const { data } = await clienteAxios.get('/habitaciones/registros', config);

            // Actualiza el estado con los registros obtenidos.
            setRegistros(data);
        } catch (error) {
            console.log(error);
        }
    }
    obtenerRegistrosDeTodasLasHabitaciones()
    }, [registros])

    const handleBuscador = ()=>{
        setBuscador(!buscador)
    }

    const cerrarSesion = ()=>{
        setHabitaciones([])
        setHabitacion({})
    }
    
    return (
        <HabitacionContext.Provider
            value={{
                habitaciones,
                submitHabitacion,
                obtenerHabitacion,
                habitacion,
                cargando,
                modalFormularioRegistro,
                handleModalRegistro,
                submitRegistro,
                handleModalEditarRegistro,
                registro,
                handleModalEliminarRegistro,
                modalEliminarRegistro,
                eliminarRegistro,
                quitarDeuda,
                finalizarEstancia,
                errorMessage,
                eliminarHabitacion,
                registros,
                handleBuscador,
                buscador,
                submitHabitacionEstado,
                cerrarSesion
            }}
        >
            {children}
        </HabitacionContext.Provider>
    )
}

export { HabitacionProvider }

export default HabitacionContext