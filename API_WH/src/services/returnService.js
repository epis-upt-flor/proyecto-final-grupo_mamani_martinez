const Return = require('../schemas/schemas').Return;

/**
 * @author STEVE
*/
class returnService{
    /**
    * @author ALEXIZ
    * @function createReturn
    * @param {Object} returnData - Objeto con los datos de la devolución
    * @returns {Promise} Promesa que resuelve con la devolución creada
    * @throws {Error} Error si ocurre algún problema al guardar la devolución
    * @description Crea un objeto de tipo Return con los datos proporcionados y lo guarda en la base de datos.
    */
    async createReturn(returnData){
        try {
            const returns = new Return(returnData);
            const savedReturn = await returns.save();
            return savedReturn;
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * @author ALEXIZ
     * @function getAllReturns
     * @returns {Promise} Promesa que resuelve con todas las devoluciones
     * @throws {Error} Error si ocurre algún problema al buscar las devoluciones
     * @description Obtiene todas las devoluciones almacenadas en la base de datos.
     */
    async getAllReturns(){
        try {
            const returns = await Return.find({});
            return returns;
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * @author ALEXIZ
     * @function getReturnById
     * @param {string} returnId - ID de la devolución a buscar
     * @returns {Promise} Promesa que resuelve con la devolución encontrada
     * @throws {Error} Error si ocurre algún problema al buscar la devolución
     * @description Busca una devolución en la base de datos por su ID.
     */
    async getReturnById(returnId){
        try {
            const returns = await Return.findById(returnId);
            return returns;
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * @author ALEXIZ
     * @function updateReturnStatusById
     * @param {string} returnId - El ID del objeto de tipo Return
     * @param {string} newStatus - El nuevo estado que se desea asignar
     * @returns {Promise<Object>} - El objeto de tipo Return actualizado
     * @description Actualiza el estado de una devolución en la base de datos por su ID.
     */
    async updateReturnStatusById(returnId, newStatus){
        try {
            const returns = await Return.findByIdAndUpdate(returnId,{ status: newStatus });
            return returns;
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * @author ALEXIZ
     * @function deleteReturnById
     * @param {string} returnId - ID de la devolución a eliminar
     * @returns {Promise} Promesa que resuelve con la devolución eliminada
     * @throws {Error} Error si ocurre algún problema al eliminar la devolución
     * @description Elimina una devolución de la base de datos por su ID.
     */

    async deleteReturnById(returnId){
        try {
            const returns = await Return.findByIdAndDelete(returnId);
            return returns;
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = {
    returnService
};