import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  // USAMOS EL ORM EL CUAL NOS DA ACCESO A TODOS LOS METODOS 
  const prisma = new PrismaClient();

  // CREAR ORDENES GET OBTENER ORDENES
  const ordenes = await prisma.orden.findMany({
    where: {
      estado: false 
    }
  })
  res.status(200).json(ordenes);
  // OBTENER ORDENES POST GENERAR ORDENES
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
    res.status(200).json(orden);
  }
}
