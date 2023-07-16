import React from 'react'
import Image from 'next/image'
import { formatearDinero } from '../helpers'
export default function Orden( {orden} ) {
    const {id, nombre, total, pedido} = orden
    return (
        <div className="border p-10 space-y-5 ">
            <h3 className="text-2xl font-bold">Orden: {id}</h3>
            <p className="text-lg font-bold">Cliente: {nombre}</p>
            <div>
                {pedido.map( platillo => (
                    <div key= {platillo.id} className="py-3 flex border-b last-of-type:border-0 items-center">
                        <div className="w-32">
                            <Image
                                width={400}
                                height={500}
                                src={`/assets/img/${platillo.imagen}.jpg`}
                                alt={`Imagen Platillo ${nombre}`}
                            />
                        </div>

                        <div className="p-5 space-y-2">
                            <h4 className="text-xl font-bold text-amber-600">{platillo.nombre}</h4>
                            <p className="text-xl font-bold">Cantidad: {platillo.cantidad}</p>
                        </div>

                    </div>
                ))}
            </div>    

            <div className="md:flex md:place-items-center md:justify-between my-10">
                <p className="mt-5 font-black text-4xl text-amber-500">
                    Total a pagar: {formatearDinero(total)}
                </p>
            </div>
        </div>
    )
}
