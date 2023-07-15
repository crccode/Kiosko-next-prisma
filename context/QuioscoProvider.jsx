import { useState, useEffect, createContext } from 'react'
import axios from 'axios'

import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

const QuioscoContext = createContext()


const QuioscoProvider = ({children}) => {
    // MEJORA SIEMPRE MUESTRA EL MENMU 
    const router = useRouter()
    // 1. LISTA DE LAS CATEGORIAS
    const [categorias, setCategorias] = useState([]);
    // 2. CATEGORIA ACTUAL 
    const [categoriaActual, setCategoriaActual] = useState({})
    // 3. PRODUCTO SELECCIONADO
    const [producto, setProducto ] = useState({})
    // 4 CREAMOS UN MODAL 
    const [modal, setModal] = useState(false)
    // 5 PEDIDOS PODEMOS AGREGAR MULTIPLES ELEMENTOS
    const [pedido, setPedido] = useState([])


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
        // CUANDO SELECCIONAS UN ELEMENTO DEL ASIDE TE LLEVA A LA RUTA MAIN
        router.push('/')
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

    // 5 AGREGAR O ACTUALIZAR PEDIDO
    // ({categoriaId, ...producto}) SACA categoriaId Y CREAR UN NUEVO ARRAY
    const handleAgregarPedido = ({categoriaId, ...producto}) => {
        // SI EL PRODUCTO ESTA ENB EL STATE LO ACTUALIZAMOS
        // some NOS RETORNA TRUE O FALSE SI UN ELEMENTO CUMPLE CON LA CONDICION
        if(pedido.some(productoState => productoState.id === producto.id)) {
           // Actualizar la cantidad
           const pedidoActualizado = pedido.map(productoState => productoState.id === producto.id ? producto : productoState)
           setPedido(pedidoActualizado)

           toast.success('Guardado Correctamente')
        } else {
            setPedido([...pedido, producto])
            toast.success('Agregado al Pedido')
        }

        setModal(false)
        
    }

    // 6 EDITAR LAS CATIDADES DESDE EL COMPONENTE DE RESUMEN 
    const handleEditarCantidades = id => {
        const productoActualizar = pedido.filter( producto => producto.id === id)
        // SOLO TE DEVUELVE UN ELEMENTO
        setProducto(productoActualizar[0])
        setModal(!modal)
    }

    // 7 ELIMINAR PRODUCTO
    const handleEliminarProducto = id => {
        const pedidoActualizado = pedido.filter( producto => producto.id !== id)
        // DEVULVE UNA LISTA DE LOS PRODUCTO QUE NO TENGAN EL ID
        setPedido(pedidoActualizado)
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
                handleChangeModal,
                handleAgregarPedido,
                pedido,
                handleEditarCantidades,
                handleEliminarProducto
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