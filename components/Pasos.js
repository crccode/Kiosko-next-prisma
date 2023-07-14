import { useRouter } from "next/router";

const pasos = [
    { paso: 1, nombre: "Menú", url: "/" },
    { paso: 2, nombre: "Resumen", url: "/resumen" },
    { paso: 3, nombre: "Datos y Total", url: "/total" },
  ];

  const Pasos = () => {
    //  Hooks de router 
    const router = useRouter();
    
    return (
        <>
            <div className="flex justify-between mb-5">
                {pasos.map((paso) => (
                <button
                    onClick={() => {
                        router.push(paso.url);
                    }}
                    className="text-2xl font-bold"
                    key={paso.paso}
                >
                    {paso.nombre}
                </button>
                ))}
            </div>

     
        </>
    );
};

export default Pasos;
