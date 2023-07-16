import useSWR from 'swr'
import axios from 'axios'
import AdminLayout from "../layout/AdminLayout"
import Orden from '../components/Orden'
export default function Admin() {
    // fetcher ES LA FORMA EN LA QUE CONSUMES LA API
    const fetcher = () => axios('/api/ordenes').then(datos => datos.data)
    // ESTO DATOS LO RETORNA EL HOOKS POR DEFECTO
    // data SON LOS DATOS UNA VEZ QUE HACE LA CONSULTA A LA API
    const {data , error, isLoading} = useSWR('/api/ordenes', fetcher)
    console.log(data)
    console.log(error)
    console.log(isLoading)
    return (
        <AdminLayout pagina={'Admin'}>
            <h1 className="text-4xl font-black">Panel de Administracion</h1>
            <p className="text-2xl my-10">Adiministra tus ordenes</p>
            {data && data.length ? data.map(orden =>
                <Orden
                    key= {orden.id}
                    order= {orden}
                />
            ): <p>No hay ordenes</p>}
        </AdminLayout>
    )
}