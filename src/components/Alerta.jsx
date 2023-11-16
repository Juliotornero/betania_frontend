

const Alerta = ({alerta}) => {
  return (
    <div className={`w-3/4 mx-auto ${alerta.error ? 'from-red-400 to-red-600' : 'from-sky-400 to-sky-600'} bg-gradient-to-br text-center p-3 rounded-xl uppercase text-white font-bold text-xs my-5`}>
        {alerta.msg}    
    </div>
  )
}

export default Alerta