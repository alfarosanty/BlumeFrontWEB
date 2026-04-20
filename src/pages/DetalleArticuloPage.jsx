import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDetalleArticulo } from "../services/articuloService";
import DetalleArticulo from "../components/DetalleArticulo"; // Importás el componente visual

const DetalleArticuloPage = () => {
    const { id } = useParams(); // Este es el ID que viene de la URL
    const [variantes, setVariantes] = useState([]);

    useEffect(() => {
        const controller = new AbortController();

        // Pasamos el id (de useParams) y el signal
        getDetalleArticulo(1, 50, id, controller.signal).then(data => {
            if (data) { // Solo seteamos si no fue una cancelación (data !== null)
                setVariantes(data);
            }
        });

        return () => controller.abort(); // Al desmontar, cancela
    }, [id]);

    if (variantes.length === 0) return <p className="p-10 text-center">Cargando...</p>;

    return <DetalleArticulo variantes={variantes} />; 
};
export default DetalleArticuloPage;