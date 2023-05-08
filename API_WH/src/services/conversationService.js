const Conversation = require('../schemas/schemas').Conversation;

async function createConversation(conversationData) {
    try {
        const newConversation = new Conversation(conversationData);
        const savedConversation = await newConversation.save();
        return savedConversation;
    } catch (error) {
        throw error;
    }
}

async function getConversationById(conversationId) {
    try {
        const conversation = await Conversation.findById(conversationId);
        return conversation;
    } catch (error) {
    }
}

async function updateConversation(conversationId, conversationData) {
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
}

// Delete
async function deleteConversation(conversationId) {
    try {
        const deletedConversation = await Conversation.findByIdAndDelete(conversationId);
        return deletedConversation;
    } catch (error) {
        
    }
}

module.exports = {
    createConversation,
    getConversationById,
    updateConversation,
    deleteConversation
};
