const Order = require('../schemas/schemas').Order;

/**
 * @author STEVE
*/
class orderService{
    /**
     * @author STEVE
     * @function createOrder
     * @description Crea una nueva orden de compra con la información dada
     * @param {Object} orderData - Objeto con los datos de la orden de compra
     * @returns {Promise<Object>} - Promesa que resuelve con la orden de compra creada
     * @throws {Error} - Si ocurre algún error al guardar la orden de compra
    */
    async createOrder(orderData) {
        try {
            const order = new Order(orderData);
            const savedOrder = await order.save();
            return savedOrder;
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * @author STEVE
     * @function getAllOrders
     * @description Obtiene todas las órdenes de compra almacenadas
     * @returns {Promise<Array>} - Promesa que resuelve con un array de órdenes de compra
     * @throws {Error} - Si ocurre algún error al buscar las órdenes de compra
    */
    async getAllOrders() {
        try {
            const orders = await Order.find();
            return orders;
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * @author STEVE
     * @function updateOrderDeliveryStatusById
     * @description Actualiza el estado de entrega de una orden de compra por su ID
     * @param {string} orderId - ID de la orden de compra a actualizar
     * @param {string} newStatus - Nuevo estado de entrega de la orden de compra
     * @returns {Promise<Object>} - Promesa que resuelve con la orden de compra actualizada
     * @throws {Error} - Si ocurre algún error al buscar o actualizar la orden de compra
    */
    async getOrdersByCustomerId(customerId) {
        try {
            const orders = await Order.findOne({ customer_id: customerId,status:"P"});
            return orders
        } catch (error) {
            return null
        }
    }
    /**
     * @author STEVE
     * @function updateOrderStatusById
     * @description Actualiza el estado de entrega de una orden específica
     * @param {string} orderId - ID de la orden que se desea actualizar
     * @param {string} newStatus - El nuevo estado de entrega que se desea asignar
     * @returns {Promise<Object>} - El objeto de tipo Order actualizado
     * @throws {Error} - Si ocurre algún error al buscar o actualizar la orden de compra
    */
    async updateOrderStatusById(orderId, newStatus) {
        try {
            const order = await Order.findOneAndUpdate(
                { order_id: orderId },
                { status: newStatus },
                { new: true }
            );
            return order;
        } catch (error) {
            throw new Error(error);
        }
    }
    /**
     * @author STEVE
     * @function updateOrderDeliveryStatusById
     * @description Actualiza el estado de entrega de una orden específica
     * @param {string} orderId - ID de la orden que se desea actualizar
     * @param {string} newStatus - El nuevo estado de entrega que se desea asignar
     * @returns {Promise<Object>} - El objeto de tipo Order actualizado
     * @throws {Error} - Si ocurre algún error al buscar o actualizar la orden de compra
    */
    async updateOrderDeliveryStatusById(orderId, newStatus) {
        try {
            const order = await Order.findOneAndUpdate({ order_id: orderId }, { delivery_status: newStatus }, { new: true });
            return order;
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * @author STEVE
     * @function updateOrderPaymentStatusById
     * @description Actualiza el estado de pago de una orden específica
     * @param {string} orderId - ID de la orden que se desea actualizar
     * @param {string} newStatus - El nuevo estado de pago que se desea asignar
     * @returns {Promise<Object>} - El objeto de tipo Order actualizado
     */
    async updateOrderPaymentStatusById(orderId, newStatus) {
        try {
            const order = await Order.findOneAndUpdate({ order_id: orderId }, { payment_status: newStatus }, { new: true });
            return order;
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * @author STEVE
     * @function getListProducts
     * @description Obtiene los productos de una orden específica
     * @param {string} orderId - ID de la orden de la cual se desean obtener los productos
     * @returns {Promise<Array>} - Array con los productos de la orden especificada
     * @throws {Error} Error si ocurre algún problema al buscar los productos
     */
    async getListProducts(orderId) {
        try {
            const order = await Order.findOne({order_id:orderId});
            return order.products;
        } catch (error) {
            throw error;
        }
    }

    /**
     * @author STEVE
     * @function addListProducts
     * @description Agrega una lista de productos a una orden específica
     * @param {string} orderId - ID de la orden a la cual se desea agregar la lista de productos
     * @param {string} name - Nombre del producto a la cual se va agrega a la lista de productos
     * @param {int} quantity - Cantidad del producto a la cual se va agrega a la lista de productos
     * @param {int} price - Precio del producto a la cual se va agrega a la lista de productos
     * @returns {Promise<Object>} - El objeto de tipo Order actualizado con la lista de productos agregada
     * @throws {Error} Error si ocurre algún problema al actualizar la orden
     */
    async addListProducts(orderId,_name,_quantity,_price) {
        try {
            let product = {name:_name,quantity:_quantity,price :_price}
            const result = await Order.updateOne(
                { order_id: orderId },
                { $push: { products: product } }
            );
            return result;
        } catch (error) {
            throw error;
        }
    }
    /**
     * @author STEVE
     * @function updateListProducts
     * @description Actualiza un producto de una orden específica
     * @param {string} orderId - ID de la orden a la cual pertenece el producto a actualizar
     * @param {Object} updateData - Objeto con los datos actualizados del producto
     * @returns {Promise<Object>} - El objeto de tipo Order actualizado con el
     * @throws {Error} Error si ocurre algún problema al actualizar la orden de compra
     */
    async updateListProducts(orderId, updateData) {
        try {
            const result = await Order.updateOne(
            {
                order_id: orderId,
                "products._id": updateData._id
            },
            { $set: { "products.$.quantity": updateData.quantity } }
            );
            return result;
        } catch (error) {
            throw error;
        }
    }


    /**
     * @author STEVE
     * @function deleteListProduct
     * @description Elimina un producto de una orden específica en la base de datos.
     * @param {string} orderId - ID de la orden a la que pertenece el producto
     * @param {string} productId - ID del producto a eliminar
     * @returns {Promise} Promesa que se resuelve con el resultado de la eliminación del producto
     * @throws {Error} Error si ocurre algún problema al eliminar el producto
     */
    async deleteListProduct(orderId, productId){
        try {
            const result = await Order.updateOne(
                { _id: orderId },
                { $pull: { products: { _id: productId } } }
            );
            return result;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = {
    orderService
};