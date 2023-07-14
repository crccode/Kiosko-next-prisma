import Image from "next/image";
import useQuiosco from "../hooks/useQuiosco";

const Categoria = ({ categoria }) => {
  // EXTREMOS DEL QUIOSCOPROVIDER 
  const { categoriaActual, handleClickCategoria } = useQuiosco();
  // EXTREMOS LOS CAMPOS DE LA BD
  const { nombre, icono, id } = categoria;
  return (
    <div
      // categoriaActual? ESTO ? ES PARA INDICAR QUE ESTE VALOR PUEDE ESTAR O NO DISPONIBLE
      className={`${
        categoriaActual?.id === id ? "bg-amber-400" : ""
      } flex items-center gap-4 w-full border p-5 hover:bg-amber-400`}
    >
      <Image
        width={70}
        height={70}
        src={`/assets/img/icono_${icono}.svg`}
        alt="Imagen Icono"
      />
      {/* CADA VEZ QUE PRESIONE CLIC CAMBIARA EL STATE  */}
      <button
        type="button"
        className="text-2xl font-bold hover:cursor-pointer"
        onClick={() => handleClickCategoria(id)}
      >
        {nombre}
      </button>
    </div>
  );
};

export default Categoria;
