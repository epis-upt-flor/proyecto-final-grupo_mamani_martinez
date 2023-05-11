const Delivery = require('../schemas/schemas').Delivery;


/**
 * @author ALEXIZ
 * @function createConversation
 * @description Crea un nuevo registro de delivery
 * @param {Object} deliveryData - Datos del registro de delivery
 * @returns {Promise} Promesa con el registro de delivery creado
 * @throws {Error} Error al crear el registro de delivery
 */
const createDelivery = async(deliveryData) =>{
    try {
        const delivery = new Delivery(deliveryData);
        const savedDelivery = await delivery.save();
        return savedDelivery;
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * @author ALEXIZ
 * @function createConversation
 * @descriptionObtiene todos los registros de delivery
 * @returns {Promise} Promesa con la lista de registros de delivery
 * @throws {Error} Error al obtener la lista de registros de delivery
 */
const getAllDeliveries = async() =>{
    try {
        const deliveries = await Delivery.find({});
        return deliveries;
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * @author ALEXIZ
 * @function createConversation
 * @descriptionObtiene un registro de delivery por su ID
 * @param {string} deliveryId - ID del registro de delivery a buscar
 * @returns {Promise} Promesa con el registro de delivery encontrado
 * @throws {Error} Error al buscar el registro de delivery por ID
*/
const getDeliveryById = async(deliveryId) =>{
    try {
        const delivery = await Delivery.findById(deliveryId);
        return delivery;
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * @author ALEXIZ
 * @function createConversation
 * @descriptionObtiene un registro de delivery por su dirección
 * @param {string} deliveryAddress - Dirección del registro de delivery a buscar
 * @returns {Promise} Promesa con el registro de delivery encontrado
 * @throws {Error} Error al buscar el registro de delivery por dirección
 */
const getDeliveryByAddress = async(deliveryAddress) =>{
    try {
        const delivery = await Delivery.findOne({ delivery_address: deliveryAddress });
        return delivery;
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * @author ALEXIZ
 * @function createConversation
 * @description Actualiza un registro de delivery por su ID
 * @param {string} deliveryId - ID del registro de delivery a actualizar
 * @param {Object} deliveryData - Nuevos datos del registro de delivery
 * @returns {Promise} Promesa con el registro de delivery actualizado
 * @throws {Error} Error al actualizar el registro de delivery por ID
 */
const updateDeliveryById = async(deliveryId, deliveryData) => {
    try {
        const delivery = await Delivery.findByIdAndUpdate(deliveryId, deliveryData, { new: true });
        return delivery;
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * @author ALEXIZ
 * @function createConversation
 * @description Elimina un registro de delivery por su ID
 * @param {string} deliveryId - ID del registro de delivery a eliminar
 * @returns {Promise} Promesa con el registro de delivery eliminado
 * @throws {Error} Error al eliminar el registro de delivery por ID
 */
const deleteDeliveryById = async(deliveryId) => {
    try {
        const delivery = await Delivery.findByIdAndDelete(deliveryId);
        return delivery;
    } catch (error) {
        throw new Error(error);
    }
}


module.exports = {
    createDelivery,
    getAllDeliveries,
    getDeliveryById,
    getDeliveryByAddress,
    updateDeliveryById,
    deleteDeliveryById
};