// src/data/models/articulo.js
export const articuloModel = {
    id: 0,
    codigo: "",
    descripcion: "",
    id_color: null,
    id_medida: null,
    id_subfamilia: null,
    id_articulo_precio: null,
    habilitado: true,
    // Las relaciones van como objetos o null
    color: null,
    medida: null,
    subfamilia: null,
    articulo_precio: null
};