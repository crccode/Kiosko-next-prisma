import { useState, useEffect, createContext } from 'react'
import axios from 'axios'

const QuioscoContext = createContext()


const QuioscoProvider = ({children}) => {
    const [categorias, setCategorias] = useState([]);

    const obtenerCategorias = async () => {
        const {data} = await axios('api/categorias')
        setCategorias(data)
        console.log(data)
    }
    // Se va a ejecutar una vez por lo que el arreglo de dependencia es vacio
    useEffect( () => {
        obtenerCategorias()
    }, [])
    return(
        <QuioscoContext.Provider
            value={{
                categorias
            }}
        >
            {children}
        </QuioscoContext.Provider>
    )
}
export {
    QuioscoProvider
}
export default QuioscoContext