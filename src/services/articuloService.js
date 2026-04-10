export const getProductById = async (id) => {
  // Aquí iría el fetch(`.../productos/${id}`)
  // Por ahora lo buscamos en nuestro archivo local
  const data = await getProducts(); 
  return data.find(p => p.id === parseInt(id));
};