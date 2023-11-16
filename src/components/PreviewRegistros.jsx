import { formatearFecha } from "../helpers/formatearFecha"


const PreviewRegistros = ({ registros }) => {


  const { documento, nombre, apellido, correo, celular, fechaEntrada, fechaSalida, metodoPago, precioTotal, deuda, nota } = registros



  return (

        <tr className="border-b bg-gray-800 border-gray-700 text-white text-xs">

          <td className="px-6 py-4">
            {documento}
          </td>
          <td className="px-6 py-4">
            {nombre}
          </td>
          <td className="px-6 py-4">
            {apellido}
          </td>
          <td className="px-6 py-4">
            {correo}
          </td>
          <td className="px-6 py-4">
            {celular}
          </td>
          <td className="px-6 py-4">
            {formatearFecha(fechaEntrada)}
          </td>
          <td className="px-6 py-4">
            {formatearFecha(fechaSalida)}
          </td>
          <td className="px-6 py-4 uppercase">
            {metodoPago}
          </td>
          <td className="px-6 py-4">
            S/. {precioTotal}
          </td>
        </tr>

  )
}

export default PreviewRegistros