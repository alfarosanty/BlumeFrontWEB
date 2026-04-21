// Este es el modelo que el Front usará para "limpiar" 
// lo que viene de la API antes de meterlo al Contexto
export const crearArticuloCarrito = (articuloApi) => {
  return {
    id_articulo: articuloApi.id,
    codigo: articuloApi.codigo,
    descripcion: articuloApi.descripcion,
    precio_unitario: articuloApi.articuloPrecio.precio1,
    cantidad: 1,
    url_foto: articuloApi.articuloPrecio.url_foto || 'https://placehold.co/200',
    subtotal: articuloApi.articuloPrecio.precio1,
    color_nombre: articuloApi.color.descripcion,
    color_hexa: articuloApi.color.color_hexa,
    medida_nombre: articuloApi.medida.descripcion
  };
};