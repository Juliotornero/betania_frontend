
const Thead = () => {
    return (
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">Documento</th>
                <th scope="col" className="px-6 py-3">Nombre</th>
                <th scope="col" className="px-6 py-3">Apellido</th>
                <th scope="col" className="px-6 py-3">Correo</th>
                <th scope="col" className="px-6 py-3">Celular</th>
                <th scope="col" className="px-6 py-3">Fecha de Entrada</th>
                <th scope="col" className="px-6 py-3">Fecha de Salida</th>
                <th scope="col" className="px-6 py-3">Método de Pago</th>
                <th scope="col" className="px-6 py-3">Precio Total</th>
            </tr>
        </thead>
    )
}

export default Thead