// ventas.model.js  

 
const { v4: uuidv4 } = require('uuid');

// Simulación de la base de datos en memoria

let ventasDB = [];

/**
 * Módulo del modelo para la gestión de ventas.
 * Este módulo se encarga de las operaciones CRUD y de búsqueda de datos,
 * actuando como la capa de acceso a la base de datos.
 */
class VentaModel {

  /**
   * Obtiene todas las ventas.
   * @returns {Promise<Array>} Un array de objetos de venta.
   */
  static async findAll() {
    return Promise.resolve(ventasDB);
  }

  /**
   * Busca una venta por su ID.
   * @param {string} id El ID de la venta.
   * @returns {Promise<object|undefined>} La venta encontrada o undefined si no existe.
   */
  static async findById(id) {
    const venta = ventasDB.find(v => v.id === id);
    return Promise.resolve(venta);
  }

  /**
   * Busca todas las ventas de un cliente específico.
   * @param {string} clienteId El ID del cliente.
   * @returns {Promise<Array>} Un array de ventas del cliente.
   */
  static async findByClienteId(clienteId) {
    const ventasDelCliente = ventasDB.filter(v => v.clienteId === clienteId);
    return Promise.resolve(ventasDelCliente);
  }

  /**
   * Crea una nueva venta.
   * @param {object} venta El objeto de la venta a crear.
   * @returns {Promise<object>} La venta creada con un nuevo ID.
   */
  static async create(venta) {
    const nuevaVenta = { ...venta, id: uuidv4() };
    ventasDB.push(nuevaVenta);
    return Promise.resolve(nuevaVenta);
  }

  /**
   * Actualiza una venta existente.
   * @param {string} id El ID de la venta a actualizar.
   * @param {object} datosActualizados Los datos de la venta para actualizar.
   * @returns {Promise<object|null>} La venta actualizada o null si no se encontró.
   */
  static async update(id, datosActualizados) {
    const index = ventasDB.findIndex(v => v.id === id);
    if (index === -1) {
      return Promise.resolve(null);
    }
    const ventaActualizada = { ...ventasDB[index], ...datosActualizados, id };
    ventasDB[index] = ventaActualizada;
    return Promise.resolve(ventaActualizada);
  }

  /**
   * Elimina una venta por su ID.
   * @param {string} id El ID de la venta a eliminar.
   * @returns {Promise<boolean>} True si la venta fue eliminada, false en caso contrario.
   */
  static async delete(id) {
    const index = ventasDB.findIndex(v => v.id === id);
    if (index === -1) {
      return Promise.resolve(false);
    }
    ventasDB.splice(index, 1);
    return Promise.resolve(true);
  }
}

module.exports = VentaModel;
