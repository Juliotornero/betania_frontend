import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import useHabitacion from '../hooks/useHabitacion'
import { useParams } from 'react-router-dom'

const METODOPAGO = ['efectivo', 'tarjeta', 'transferencia', 'e-wallet']

const ModalFormularioRegistros = () => {

    const [id, setId] = useState('')
    
    const [documento, setDocumento] = useState('')
    const [tipoRegistro, setTipoRegistro] = useState('hospedar')
    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [correo, setCorreo] = useState('')
    const [celular, setCelular] = useState('')
    const [fechaEntrada, setFechaEntrada] = useState(new Date().toISOString().split('T')[0]);
    const [fechaSalida, setFechaSalida] = useState('')
    const [metodoPago, setMetodoPago] = useState('')
    const [precioTotal, setPrecioTotal] = useState('')
    const [nota, setNota] = useState('')
    const [deuda, setDeuda] = useState(false)
    const [estado, setEstado] = useState(true)

    const params = useParams()



    const { modalFormularioRegistro, handleModalRegistro, submitRegistro, registro } = useHabitacion();

    useEffect(() => {
        if (registro?._id) {
            setId(registro._id)
            setDocumento(registro.documento)
            setNombre(registro.nombre)
            setApellido(registro.apellido)
            setCorreo(registro.correo)
            setCelular(registro.celular)
            //setFechaEntrada(registro.fechaEntrada?.split('T')[0])
            setFechaSalida(registro.fechaSalida?.split('T')[0])
            setMetodoPago(registro.metodoPago)
            setPrecioTotal(registro.precioTotal)
            setNota(registro.nota)
            return
        }
        setId('')
        setDocumento('')
        setNombre('')
        setApellido('')
        setCorreo('')
        setCelular('')
        //setFechaEntrada('')
        setFechaSalida('')
        setMetodoPago('')
        setPrecioTotal('')
        setNota('')
    }, [registro])



    const handleSubmit = async e => {
        e.preventDefault()

        await submitRegistro({ id, documento, nombre, apellido, correo, celular, fechaEntrada, fechaSalida, metodoPago, precioTotal, habitacion: params.id, deuda, estado, nota, tipoRegistro })

        setId('')
        setDocumento('')
        setNombre('')
        setApellido('')
        setCorreo('')
        setCelular('')
        //setFechaEntrada('')
        setFechaSalida('')
        setMetodoPago('')
        setPrecioTotal('')
        setNota('')

    }

    return (
        <Transition.Root show={modalFormularioRegistro} as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={handleModalRegistro}>
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay
                            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                        />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>

                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">


                            <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                                <button
                                    type="button"
                                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    onClick={handleModalRegistro}
                                >
                                    <span className="sr-only">Cerrar</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>


                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                    <Dialog.Title as="h3" className="text-lg leading-6 font-bold text-gray-900">
                                        {id ? 'Editar Registro' : 'Crear Registro'}
                                    </Dialog.Title>
                                    {/* { msg && <Alerta alerta={alerta} /> } */}
                                    <form className='my-10' onSubmit={handleSubmit}>

                                        <div className='mb-5'>
                                            <label className='text-gray-700 uppercase font-bold text-sm'>TIPO DE REGISTRO:</label>
                                            <select
                                                id="TipoRegistro"
                                                className='border w-full p-2 mt-2'
                                                value={tipoRegistro}
                                                onChange={(e) => setTipoRegistro(e.target.value)}
                                            >
                                                <option value="hospedar">Hospedar</option>
                                                <option value="reservar">Reservar</option>
                                            </select>
                                        </div>

                                        <div className='mb-5'>
                                            <label htmlFor="documento" className='text-gray-700 uppercase font-bold text-sm'>Nro. DNI: <span className='text-red-700 text-[8px]'>*obligatorio*</span></label>
                                            <input
                                                id='documento'
                                                type="text"
                                                className='border-2 w-full p-2 mt-2 placeholder:gray-400 rounded-md'
                                                placeholder=''
                                                value={documento}
                                                required
                                                minLength="8"
                                                onChange={e => setDocumento(e.target.value)}
                                            />
                                        </div>
                                        <div className='mb-2'>
                                            <label
                                                className='text-gray-700 uppercase font-bold text-sm'
                                                htmlFor="nombre"
                                            >
                                                Nombres: <span className='text-red-700 text-[8px]'>*obligatorio*</span>
                                            </label>
                                            <input
                                                id="nombre"
                                                type="text"
                                                className='border-2 w-full p-2 mt-2 placeholder:gray-400 rounded-md'
                                                placeholder=''
                                                required
                                                value={nombre}
                                                onChange={e => setNombre(e.target.value)}
                                            />
                                        </div>
                                        <div className='mb-2'>
                                            <label
                                                className='text-gray-700 uppercase font-bold text-sm'
                                                htmlFor="apellido"
                                            >
                                                Apellidos: <span className='text-red-700 text-[8px]'>*obligatorio*</span>
                                            </label>
                                            <input
                                                id="apellido"
                                                type="text"
                                                required
                                                className='border-2 w-full p-2 mt-2 placeholder:gray-400 rounded-md'
                                                placeholder=''
                                                value={apellido}
                                                onChange={e => setApellido(e.target.value)}
                                            />
                                        </div>
                                        <div className='mb-2'>
                                            <label
                                                className='text-gray-700 uppercase font-bold text-sm'
                                                htmlFor="correo"
                                            >
                                                Correo: <span className='text-green-700 text-[8px]'>*opcional*</span>
                                            </label>
                                            <input
                                                id="correo"
                                                type="email"
                                                className='border-2 w-full p-2 mt-2 placeholder:gray-400 rounded-md'
                                                placeholder='correo@correo.com'
                                                value={correo}
                                                onChange={e => setCorreo(e.target.value)}
                                            />
                                        </div>
                                        <div className='mb-2'>
                                            <label
                                                className='text-gray-700 uppercase font-bold text-sm'
                                                htmlFor="celular"
                                            >
                                                Celular: <span className='text-green-700 text-[8px]'>*opcional*</span>
                                            </label>
                                            <input
                                                id="celular"
                                                type="text"
                                                className='border-2 w-full p-2 mt-2 placeholder:gray-400 rounded-md'
                                                placeholder=''
                                                value={celular}
                                                onChange={e => setCelular(e.target.value)}
                                            />
                                        </div>
                                        <div className='mb-2'>
                                            <label
                                                className='text-gray-700 uppercase font-bold text-sm'
                                                htmlFor="Ingreso"
                                            >
                                                Fecha de Entrada: <span className='text-red-700 text-[8px]'>*obligatorio*</span>
                                            </label>
                                            <input
                                                id="Ingreso"
                                                type="date"
                                                required
                                                disabled={tipoRegistro === 'hospedar'}
                                                className='border-2 w-full p-2 mt-2 placeholder:gray-400 rounded-md'
                                                value={fechaEntrada}
                                                onChange={e => setFechaEntrada(e.target.value)}
                                                min={new Date().toISOString().split('T')[0]}
                                            />
                                        </div>
                                        <div className='mb-2'>
                                            <label
                                                className='text-gray-700 uppercase font-bold text-sm'
                                                htmlFor="Salida"
                                            >
                                                Fecha de Salida: <span className='text-red-700 text-[8px]'>*obligatorio*</span>
                                            </label>
                                            <input
                                                id="Salida"
                                                type="date"
                                                required
                                                className='border-2 w-full p-2 mt-2 placeholder:gray-400 rounded-md'
                                                value={fechaSalida}
                                                min={fechaEntrada}
                                                onChange={e => setFechaSalida(e.target.value)}
                                            />
                                        </div>
                                        <div className='mb-5'>
                                            <label className='text-gray-700 uppercase font-bold text-sm'>METODO DE PAGO:</label>
                                            <select id="MetodoPago" className='border w-full p-2 mt-2' value={metodoPago} onChange={e => setMetodoPago(e.target.value)}>
                                                <option value="">-- Seleccionar --</option>
                                                {METODOPAGO.map(opcion => (
                                                    <option key={opcion}>{opcion}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className='mb-2'>
                                            <label
                                                className='text-gray-700 uppercase font-bold text-sm'
                                                htmlFor="Precio"
                                            >
                                                Precio Total: <span className='text-red-700 text-[8px]'>*obligatorio*</span>
                                            </label>
                                            <input
                                                id="Precio"
                                                type="number"
                                                className='border-2 w-full p-2 mt-2 placeholder:gray-400 rounded-md'
                                                placeholder='0.00'
                                                value={precioTotal}
                                                min={50}
                                                onChange={e => setPrecioTotal(e.target.value)}
                                            />
                                        </div>
                                        <div className='mb-2'>
                                            <label
                                                className='text-gray-700 uppercase font-bold text-sm'
                                                htmlFor="Nota"
                                            >
                                                Observaciones: <span className='text-green-700 text-[8px]'>*opcional*</span>
                                            </label>
                                            <textarea
                                                id="Nota"
                                                type="text"
                                                className='border-2 w-full p-2 mt-2 placeholder:gray-400 rounded-md'
                                                placeholder='Incidentes o deudas'
                                                value={nota}
                                                onChange={e => setNota(e.target.value)}
                                            />
                                        </div>

                                        <input
                                            type="submit"
                                            value={id ? 'Guardar Cambios' : 'Registrar'}
                                            className="bg-sky-600 w-full p-3 uppercase font-bold text-white hover:bg-sky-800 text-sm"
                                        />
                                    </form>

                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default ModalFormularioRegistros