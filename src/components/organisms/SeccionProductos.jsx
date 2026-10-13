// src/components/organisms/SeccionProductos.jsx
import { getLegos } from '../../data/legosData'; //mi base de datos simulada
import { TarjetaProducto } from '../molecules/TarjetaProducto'; // La plantilla de la tarjeta

export function SeccionProductos() {
  // Guardamos todos los legos en una variable
  const listaDeLegos = getLegos(); 

  return (
    <div className="seccion-productos">
      <h2>Productos Destacados</h2>
      
      <div className="grid-productos">
        {/* Aquí usamos .map() para recorrer la lista de datos */}
        {listaDeLegos.map((lego) => (
          <TarjetaProducto 
            key={lego.id}
            lego={lego} /* Le paso todos los datos del lego a la tarjeta */
          />
        ))}
      </div>
    </div>
  );
}