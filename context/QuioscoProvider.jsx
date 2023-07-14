import { useState, useEffect, createContext } from 'react'
import axios from 'axios'

const QuioscoContext = createContext()


const QuioscoProvider = ({children}) => {
    // 1. LISTA DE LAS CATEGORIAS
    const [categorias, setCategorias] = useState([]);
    // 2. CATEGORIA ACTUAL 
    const [categoriaActual, setCategoriaActual] = useState({})
    // 3. PRODUCTO SELECCIONADO
    const [producto, setProducto ] = useState({})
    // 4 CREAMOS UN MODAL 
    const [modal, setModal] = useState(false)

    // 1. FUNCION QUE OBTINE DATOS DE LA API
    const obtenerCategorias = async () => {
        const {data} = await axios('api/categorias')
        setCategorias(data)
        console.log(data)
    }
    // Se va a ejecutar una vez por lo que el arreglo de dependencia es vacio
    useEffect( () => {
        obtenerCategorias()
    }, [])

    // 2. FUNCION PARA CATEGORIA SELECCIONADA 
    const handleClickCategoria = id => {
        // OBTENEMOS EL ID Y LO FILTRAMOS 
        const categoria = categorias.filter( cat => cat.id === id )
        // SI CUMPLE LA CONDICION DEVOLVEMOS AL OBJETO
        // PERO COMO ES ARRAYMETHOD DEVOLVEMOS LA POSICION 1 
        setCategoriaActual(categoria[0])
    }
    // CARGANDO CATEGORIA POR DEFECTO
    useEffect(() => {
        setCategoriaActual(categorias[0])
    }, [categorias])

    // 3. FUNCION PRODUCTO SELECCIONADO 
    const handleSetProducto = producto => {
        setProducto(producto)
    }

    // 4. MODAL
    const handleChangeModal = () => {
        setModal(!modal)
    }
    return(
        <QuioscoContext.Provider
            value={{
                categorias,
                categoriaActual,
                handleClickCategoria,
                producto,
                handleSetProducto,
                modal,
                handleChangeModal
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