
const Customer = require("../schemas/schemas").Customer;

/**
 * @author STEVE
 * @function createCustomer
 * @description Crea un nuevo cliente en la base de datos
 * @param {Object} customerData - Datos del cliente a ser guardado
 * @returns {Object} Resultado de la operación de creación
 */
const createCustomer = async (customerData) => {
    try {
        const customer = new Customer(customerData);
        const result = await customer.save();
        return result;
    } catch (error) {
        throw error;
    }
};

/**
 * @author STEVE
 * @function getCustomers
 * @description Obtiene una lista de todos los clientes en la base de datos
 * @returns {Array} Lista de clientes
 */
const getCustomers = async () => {
    try {
        const customers = await Customer.find({});
        return customers;
    } catch (error) {
        throw error;
    }
};

/**
 * @author STEVE
 * @function getCustomerByNumber
 * @description Obtiene un cliente por su número de teléfono
 * @param {String} customerNumber - Número de teléfono del cliente a buscar
 * @returns {Object} Cliente encontrado
 */
const getCustomerByNumber = async (customerNumber) => {
    try {
        const customer = await Customer.findOne({ phone_number: customerNumber });
        return customer;
    } catch (error) {
        throw error;
    }
};

/**
 * @author STEVE
 * @function updateCustomerByID
 * @description Cambia el estado a Bloqueado de un cliente por su Numero
 * @param {String} customerNumber - Numero del cliente a actualizar
 * @returns {Object} Resultado de la operación de actualización
 */
const updateCustomerByNumberLocked = async (customerNumber) => {
    try {
        const status = "0"
        const result = await Customer.updateOne({ phone_number: customerNumber }, {status});
        return result;
    } catch (error) {
        throw error;
    }
};

/**
 * @author STEVE
 * @function updateCustomerByID
 * @description Cambia el estado a Desbloqueado de un cliente por su Numero
 * @param {String} customerNumber - Numero del cliente a actualizar
 * @returns {Object} Resultado de la operación de actualización
 */
const updateCustomerByNumberUnlocked = async (customerNumber) => {
    try {
        const status = "1"
        const result = await Customer.updateOne({ phone_number: customerNumber }, {status});
        return result;
    } catch (error) {
        throw error;
    }
};
/**
 * @author STEVE
 * @function addPaymentHistory
 * @description Agrega un nuevo registro de pago al historial de pagos de un cliente
 * @param {String} customerId - ID del cliente al que se le agregará la historia de pago
 * @param {Object} paymentData - Datos del pago a agregar
 * @returns {Object} Resultado de la operación de actualización
 */
const addPaymentHistory = async (customerId, paymentData) => {
    try {
        const result = await Customer.updateOne(
            { _id: customerId },
            { $push: { payment_history: paymentData } }
        );
        return result;
    } catch (error) {
        throw error;
    }
};

/**
 * @author STEVE
 * @function getPaymentHistory
 * @description Obtiene toda la historia de pagos de un cliente
 * @param {String} customerId - ID del cliente del que se obtendrá la historia de pagos
 * @returns {Array} Historial de pagos del cliente
 */
const getPaymentHistory = async (customerId) => {
    try {
        const customer = await Customer.findById(customerId);
        return customer.payment_history;
    } catch (error) {
        throw error;
    }
};

/**
 * @author STEVE
 * @function addReturnHistory
 * @description Añade un nuevo registro de retorno al historial de retornos de un cliente
 * @param {String} customerId - ID del cliente al que se le añadirá el registro
 * @param {Object} returnData - Datos del registro de retorno
 * @returns {Object} Resultado de la operación de actualización
 */
const addReturnHistory = async (customerId, returnData) => {
    try {
        const result = await Customer.updateOne(
            { _id: customerId },
            { $push: { return_history: returnData } }
        );
        return result;
    } catch (error) {
        throw error;
    }
};

/**
 * @author STEVE
 * @function getReturnHistory
 * @description Obtiene el historial de retornos de un cliente
 * @param {String} customerId - ID del cliente del que se obtendrán los datos
 * @returns {Array} Historial de retornos del cliente
 */
const getReturnHistory = async (customerId) => {
    try {
        const customer = await Customer.findById(customerId);
        return customer.return_history;
    } catch (error) {
        throw error;
    }
};

/**
 * @author STEVE
 * @function addDeliveryHistory
 * @description Añade un nuevo registro de envío al historial de envíos de un cliente
 * @param {String} customerId - ID del cliente al que se le añadirá el registro
 * @param {Object} deliveryData - Datos del registro de envío
 * @returns {Object} Resultado de la operación de actualización
 */
const addDeliveryHistory = async (customerId, deliveryData) => {
    try {
        const result = await Customer.updateOne(
            { _id: customerId },
            { $push: { delivery_history: deliveryData } }
        );
        return result;
    } catch (error) {
        throw error;
    }
};

/**
 * @author STEVE
 * @function getDeliveryHistory
 * @description Obtiene el historial de envíos de un cliente
 * @param {String} customerId - ID del cliente del que se obtendrán los datos
 * @returns {Array} Historial de envíos del cliente
 */
const getDeliveryHistory = async (customerId) => {
    try {
        const customer = await Customer.findById(customerId);
        return customer.delivery_history;
    } catch (error) {
        throw error;
    }
};

/**
 * @author STEVE
 * @function addConversationHistory
 * @description Agrega una conversación al historial de conversaciones del cliente
 * @param {String} customerId - ID del cliente al que se le agregará la conversación
 * @param {Object} conversationData - Datos de la conversación a agregar
 * @returns {Object} Resultado de la operación de actualización
*/
const addConversationHistory = async (customerId, conversationData) => {
    try {
        const result = await Customer.updateOne(
            { _id: customerId },
            { $push: { conversation_history: conversationData } }
        );
        return result;
    } catch (error) {
        throw error;
    }
};

/**
 * @author STEVE
 * @function getConversationHistory
 * @description Obtiene el historial de conversaciones de un cliente
 * @param {String} customerId - ID del cliente del que se desea obtener el historial de conversaciones
 * @returns {Array} Historial de conversaciones del cliente
 */
const getConversationHistory = async (customerId) => {
    try {
        const customer = await Customer.findById(customerId);
        return customer.conversation_history;
    } catch (error) {
        throw error;
    }
};

/**
 * @author STEVE
 * @function addOrderHistory
 * @description Agrega una orden al historial de órdenes del cliente
 * @param {String} customerId - ID del cliente al que se le agregará la orden
 * @param {Object} orderData - Datos de la orden a agregar
 * @returns {Object} Resultado de la operación de actualización
 */
const addOrderHistory = async (customerId, orderData) => {
    try {
        const result = await Customer.updateOne(
            { _id: customerId },
            { $push: { order_history: orderData } }
        );
        return result;
    } catch (error) {
        throw error;
    }
};

/**
 * @author STEVE
 * @function getOrderHistory
 * @description Obtiene el historial de órdenes de un cliente
 * @param {String} customerId - ID del cliente del que se desea obtener el historial de órdenes
 * @returns {Array} Historial de órdenes del cliente
 */
const getOrderHistory = async (customerId) => {
    try {
        const customer = await Customer.findById(customerId);
        return customer.order_history;
    } catch (error) {
        throw error;
    }
};


module.exports = {
    createCustomer,
    getCustomers,
    getCustomerByNumber,
    updateCustomerByNumberLocked,
    updateCustomerByNumberUnlocked,
    addPaymentHistory,
    getPaymentHistory,
    addReturnHistory,
    getReturnHistory,
    addDeliveryHistory,
    getDeliveryHistory,
    addConversationHistory,
    getConversationHistory,
    addOrderHistory,
    getOrderHistory
};

