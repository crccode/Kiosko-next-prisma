// PARA USAR RUTAS DINAMICAS DEBEN TENER ESTE ordenes/[id].js
import { PrismaClient } from "@prisma/client"
export default async function handler (req, res) {
    const prisma = new PrismaClient();
    if (req.method === 'POST') {
        // El archivo se llama [id].js y los estamos paando id desde Orden
        // PERMITE RECUPERAR EL ID QEU QUIERES ACTUALIZAR
        const {id} = req.query
        //console.log(req.query.id)
        //console.log('actualizando')

        const ordenActualizada = await prisma.orden.update({
            where: {
                id: parseInt(id)
            },
            data: {
                estado: true
            }
        })  
        res.status(200).json(ordenActualizada)
    }
}