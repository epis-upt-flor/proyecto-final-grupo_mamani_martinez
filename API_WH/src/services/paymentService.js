const Payment = require('../schemas/schemas').Payment;

/**
 * @author STEVE
*/
class paymentService{
    /**
     * @author ALEXIZ
     * @description Crea un nuevo objeto de tipo Payment con los datos proporcionados y lo guarda en la base de datos.
     * @function createPayment
     * @param {Object} paymentData - Objeto con los datos del pago
     * @returns {Promise} Promesa que resuelve con el pago creado
     * @throws {Error} Error si ocurre algún problema al guardar el pago
     */
    async createPayment(paymentData){
        try {
            const payment = new Payment(paymentData);
            const savedPaymen = await payment.save();
            return savedPaymen;
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * @author ALEXIZ
     * @description Busca todos los pagos realizados por un cliente con el ID proporcionado
     * @function getPaymentsByCustomer
     * @param {string} customerId - ID del cliente que realizó los pagos
     * @returns {Promise<Array>} - Array con los pagos realizados por el cliente
     */
    async getPaymentsByCustomer(customerId){
        try {
            const payments = await Payment.find({ customer_id: customerId });
            return payments;
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * @author ALEXIZ
     * @description Busca todos los pagos realizados para una orden de compra con el ID proporcionado
     * @function getPaymentsByOrder
     * @param {string} orderId - ID de la orden de compra asociada con los pagos
     * @returns {Promise<Array>} - Array con los pagos realizados para la orden de compra
     */
    async getPaymentsByOrder(orderId){
        try {
            const payments = await Payment.find({ order_id: orderId });
            return payments;
        } catch (error) {
            throw new Error(error);
        }
    }
    /**
     * @author ALEXIZ
     * @description Busca todos los pagos realizados por el ID proporcionado del pago
     * @function getPaymentsByOrder
     * @param {string} orderId - ID de la orden de compra asociada con los pagos
     * @returns {Promise<Array>} - Array con los pagos realizados para la orden de compra
     */
    async getPaymentsBy(paymentID){
        try {
            const payments = await Payment.find({ payment_id: paymentID });
            return payments;
        } catch (error) {
            throw new Error(error);
        }
    }
    /**
     * @author ALEXIZ
     * @description Busca el metodo de pago de acuerdo al nombre
     * @function getPaymentsByOrder
     * @param {string} paymentMethod - nombre del metodod de pago
     * @returns {Promise<Array>} - Array con los pagos realizados para la orden de compra
     */
    async getPaymentsByName(paymentMethod){
        try {
            const payments = await Payment.findOne({ payment_method: paymentMethod, status: "A" });
            return payments;
        } catch (error) {
            throw new Error(error);
        }
    }
    /**
     * @author ALEXIZ
     * @description Busca un pago por su ID y actualiza su estado a uno nuevo
     * @function updateReturnStatusById
     * @param {string} paymentId - ID del pago a buscar
     * @returns {Promise} Promesa que resuelve con el pago encontrado
     * @throws {Error} Error si ocurre algún problema al buscar el pago
     */
    async updateReturnStatusById(paymentId,status){
        try {
            const payment = await Payment.findOneAndUpdate({ payment_id: paymentId },{status});
            return payment;
        } catch (error) {
            throw new Error(error);
        }
    }
    /**
     * @author ALEXIZ
     * @description Devuelve todos los pagos disponibles
     * @function getAllPayments
     * @returns {Promise} Promesa que resuelve con el pagos encontrados
     * @throws {Error} Error si ocurre algún problema al buscar el pago
     */
    async getAllPayments() {
        try {
            const payments = await Payment.find({ status: "A" });
            return payments;
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * @author ALEXIZ
     * @description Busca todos los pagos realizados en un rango de fechas especificado
     * @function getPaymentsByDateRange
     * @param {Date} startDate - Fecha de inicio del rango de búsqueda
     * @param {Date} endDate - Fecha de fin del rango de búsqueda
     * @returns {Promise} Promesa que resuelve con los pagos encontrados en el rango de fechas
     * @throws {Error} Error si ocurre algún problema al buscar los pagos
     */
    async getPaymentsByDateRange(startDate, endDate){
        try {
            const payments = await Payment.find({
                timestamp: {
                    $gte: startDate,
                    $lte: endDate
                }
            });
            return payments;
        } catch (error) {
            throw new Error(error);
        }
    }
}
module.exports = {
    paymentService
};