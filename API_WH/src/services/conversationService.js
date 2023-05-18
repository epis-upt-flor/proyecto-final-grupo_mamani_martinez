const Conversation = require('../schemas/schemas').Conversation;

/**
 * @author STEVE
*/
class conversationService{

    /**
     * @author ALEXIZ
     * @function createConversation
     * @description Crea una nueva conversación
     * @param {Object} conversationData - Datos de la conversación
     * @returns {Object} Conversación guardada
     */
    async createConversation(conversationData){
        try {
            const model = Conversation;
            const newConversation = new model(conversationData)
            const savedConversation = await newConversation.save();
            return savedConversation;
        } catch (error) {
            throw error;
        }
    }
    /**
     * @author ALEXIZ
     * @function getConversation
     * @description Obtiene todas las conversaciones
     * @returns {Array} Todas las conversaciones
     */
    async getConversation(){
        try {
            const conversations = await Conversation.find({});
            return conversations;
        } catch (error) {
            throw error;
        }
    }

    /**
     * @author ALEXIZ
     * @function getConversationByCustomer
     * @description Obtiene todas las conversaciones de un cliente
     * @param {String} customerId - ID del cliente
     * @returns {Array} Conversaciones del cliente
     */
    async getConversationByCustomer(customerId){
        try {
            const conversations = await Conversation.find({ customer_id: customerId });
            return conversations;
        } catch (error) {
            throw error;
        }
    };
    /**
     * @author ALEXIZ
     * @function getConversationsByLabel
     * @description Obtiene todas las conversaciones con una etiqueta específica
     * @param {String} label - Etiqueta a buscar
     * @returns {Array} Conversaciones con la etiqueta específica
     */
    async getConversationsByLabel(label){
        try {
            const conversations = await Conversation.find({ label: label });
            return conversations;
        } catch (error) {
            throw error;
        }
    };
    /**
     * @author ALEXIZ
     * @function updateConversation
     * @description Actualiza una conversación existente
     * @param {String} conversationId - ID de la conversación a actualizar
     * @param {Object} conversationData - Datos de la conversación actualizados
     * @returns {Object} Conversación actualizada
     */
    async updateConversation(conversationId, conversationData){
        try {
            const updatedConversation = await Conversation.findByIdAndUpdate(
                conversationId,
                conversationData,
                { new: true }
            );
            return updatedConversation;
        } catch (error) {
            throw error;
        }
    };
}
module.exports = {
    conversationService
};
