export const formatearFecha = fecha => {

    const nuevaFecha = new Date(fecha.split('T')[0].split('-'))

    const opciones = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }

    return nuevaFecha.toLocaleDateString('es-ES', opciones)  
}

