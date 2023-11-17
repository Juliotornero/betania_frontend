import { useState } from "react"
import Busqueda from "../components/Busqueda"
import PreviewRegistros from "../components/PreviewRegistros"
import useHabitacion from "../hooks/useHabitacion"
import Thead from "../components/Thead"
import { formatearFecha } from "../helpers/formatearFecha"


const ListarRegistros = () => {


    const { registros, handleBuscador } = useHabitacion()

    registros.sort((a, b) => new Date(b.fechaEntrada) - new Date(a.fechaEntrada));

    const [registroSeleccionado, setRegistroSeleccionado] = useState(null);
    const [mostrarTodos, setMostrarTodos] = useState(true);

    const [fechaEntrada, setFechaEntrada] = useState('');
    const [registrosFiltrados, setRegistrosFiltrados] = useState([]);


    const [paginaActual, setPaginaActual] = useState(1);
    const registrosPorPagina = 9;

    const indiceInicial = (paginaActual - 1) * registrosPorPagina;
    const indiceFinal = paginaActual * registrosPorPagina;
    const registrosAMostrar = registros.slice(indiceInicial, indiceFinal);

    const numeroTotalDePaginas = Math.ceil(registros.length / registrosPorPagina);

    const numerosDePagina = Array.from({ length: numeroTotalDePaginas }, (_, index) => index + 1);



    const cambiarPagina = (nuevaPagina) => {
        setPaginaActual(nuevaPagina);
    };

    const handleRegistroSeleccionado = (registro) => {
        setRegistroSeleccionado(registro);
    };

    const mostrarTodosRegistros = () => {
        setRegistroSeleccionado(null);
        setMostrarTodos(true);
    };

    const buscarPorFecha = () => {
        if (fechaEntrada) {
            const fechaEntradaFormateada = formatearFecha(fechaEntrada); // Convierte la fecha de entrada al formato "domingo, 5 de noviembre de 2023"
            const filtrados = registros.filter((registro) => {
                const fechaRegistroFormateada = formatearFecha(registro.fechaEntrada); // Convierte la fecha en los registros al mismo formato
                return fechaRegistroFormateada === fechaEntradaFormateada; // Compara las fechas formateadas
            });

            setRegistrosFiltrados(filtrados);
            setMostrarTodos(false);
            setRegistroSeleccionado(null);
        }
    };

    return (
        <section className="w-full h-full relative bg-gray-800">

            <div className="w-full flex flex-col md:flex-row justify-between items-center pb-5 bg-[#faf7f2]">

                <div className="flex flex-col md:flex-row mb-4 md:mb-0 gap-10">
                    <button onClick={handleBuscador} type='button' className='uppercase p-2 m-3 text-[#d6a0a0] bg-gray-900 shadow-md rounded-md text-center'>
                        Buscar por DNI
                    </button>
                    <div className="flex flex-col md:flex-row justify-center items-center">
                        <input
                            id="Ingreso"
                            type="date"
                            className='border border-gray-900 p-2 placeholder:gray-400 rounded-md'
                            value={fechaEntrada}
                            onChange={e => setFechaEntrada(e.target.value)}
                        />

                        <button onClick={buscarPorFecha} className="uppercase p-2 m-3 text-[#d6a0a0] bg-gray-900 shadow-md rounded-md text-center">
                            Buscar por Fecha
                        </button>
                    </div>

                </div>

                <button onClick={mostrarTodosRegistros} type='button' className='uppercase p-2 m-3 text-[#d6a0a0] bg-gray-900 shadow-md rounded-md text-center'>
                    Mostrar Todos
                </button>
                <Busqueda onRegistroSeleccionado={handleRegistroSeleccionado} />
            </div>

            <div className="overflow-x-auto">
                {registroSeleccionado ? (
                    // Muestra el registro seleccionado
                    <table className="min-w-full text-sm text-left text-gray-500">
                        <Thead />
                        <PreviewRegistros registros={registroSeleccionado} />
                    </table>
                ) : mostrarTodos ? (
                    <table className="min-w-full text-sm text-left text-gray-500">
                        <Thead />
                        <tbody>
                            {registrosAMostrar.map((registro) => (
                                <PreviewRegistros key={registro._id} registros={registro} />
                            ))}
                        </tbody>
                    </table>
                ) : (

                    registrosFiltrados.length === 0 ? (
                        <p className="uppercase text-center p-20 text-white">*No hay registros para la fecha seleccionada*</p>
                    ) : (
                        <table className="min-w-full text-sm text-left text-gray-500">
                            <Thead />
                            <tbody>
                                {registrosFiltrados.map((registro) => (
                                    <PreviewRegistros key={registro._id} registros={registro} />
                                ))}
                            </tbody>
                        </table>
                    )
                )}
            </div>

            <div className="flex justify-center items-center p-3 absolute w-full bottom-0 text-white">
                <button
                    onClick={() => cambiarPagina(paginaActual - 1)}
                    disabled={paginaActual === 1}
                    className="mr-10 flex gap-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
                    </svg>

                    Página Anterior
                </button>

                <button
                    onClick={() => cambiarPagina(paginaActual + 1)}
                    disabled={indiceFinal >= registros.length}
                    className="mr-10 flex gap-2"
                >


                    Página Siguiente
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                    </svg>
                </button>
                <div>
                    <span className="mr-2">Página:</span>
                    <select
                        value={paginaActual}
                        onChange={(e) => cambiarPagina(parseInt(e.target.value))}
                        className="text-black mr-2"
                    >
                        {numerosDePagina.map((numero) => (
                            <option key={numero} value={numero}>
                                {numero}
                            </option>
                        ))}
                    </select>
                    <span>de {numeroTotalDePaginas}</span>
                </div>
            </div>


        </section>
    )
}

export default ListarRegistros