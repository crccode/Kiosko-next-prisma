import { useRouter } from "next/router";

const pasos = [
    { paso: 1, nombre: "Menú", url: "/" },
    { paso: 2, nombre: "Resumen", url: "/resumen" },
    { paso: 3, nombre: "Datos y Total", url: "/total" },
  ];

  const Pasos = () => {
    //  Hooks de router 
    const router = useRouter();
    // CALCULA EL PROGRESO
    const calcularProgreso = () => {
        let valor;
        if (router.pathname === "/") {
          valor = 2;
        } else if (router.pathname === "/resumen") {
          valor = 50;
        } else {
          valor = 100;
        }
        return valor;
      };
    
    return (
        <>
            {/* MENU DE LAS PAGINAS  */}
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
            {/* BARRA DE PROGRESO  */}
            <div className="bg-gray-100 mb-10">
                <div
                className="rounded-full bg-amber-500 text-xs leading-none h-2 text-center text-white progreso"
                style={{ width: `${calcularProgreso()}%` }}
                ></div>
            </div>

     
        </>
    );
};

export default Pasos;
