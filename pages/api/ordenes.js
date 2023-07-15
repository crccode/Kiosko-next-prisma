import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  // USAMOS EL ORM EL CUAL NOS DA ACCESO A TODOS LOS METODOS 
  const prisma = new PrismaClient();

  if (req.method === "POST") {
    const orden = await prisma.orden.create({
      // req.body. SE USA PARA LEER LOS DATOS  
      data: { 
        nombre: req.body.nombre,
        total: req.body.total,
        pedido: req.body.pedido,
        fecha: req.body.fecha,
      },
    });
    // REGRESA LA INFORMACION DE LA BD 
    res.json(orden);
  }
}
