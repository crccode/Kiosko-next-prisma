import Layout from "../layout/Layout";
import useQuiosco from "../hooks/useQuiosco";
import ResumenProducto from "../components/ResumenProducto";

export default function Resumen() {
    // UEXTRAEMOS LA INMFORMACION 
  const { pedido } = useQuiosco();
  return (
    <Layout pagina="Resumen">
      <h1 className="text-4xl font-black">Resumen</h1>
      <p className="text-2xl my-10">Revisa tu Pedido</p>
    {/* EN CASO DE QUE NO HAYA NINGUN ELEMENTO  */}
      {pedido.length === 0 ? (    
        <p className="text-center text-2xl">No hay elementos en tu pedido</p>
      ) : (
        pedido.map((producto) => (
          <ResumenProducto key={producto.id} producto={producto} />
        ))
      )}

    </Layout>
  );
}
