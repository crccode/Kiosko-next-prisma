import { categorias } from './data/categorias'
import { productos} from './data/productos'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
// INTERACTUAREMOS CON LA BD, ES DE TIPO PROMISE PERO NO RETORNA NADA 
const main = async () : Promise<void> => {
    try {
        // DENTRO DE campo categoria VA AGREGAR el objeto categoria  A LA BD 
        await prisma.categoria.createMany({
            data: categorias
        })
        await prisma.producto.createMany({
            data: productos
        })
    } catch (error) {
        console.log(error)
    }
}
main()