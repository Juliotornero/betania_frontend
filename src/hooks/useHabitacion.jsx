import { useContext } from 'react';
import HabitacionContext from '../context/HabitacionProvider';

const useHabitacion = ()=>{
    return useContext(HabitacionContext)
}

export default useHabitacion