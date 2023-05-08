const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const conversationSchema = new Schema({
    conversation_id: String,
    customer_id: String,
    timestamp: Date,
    messages: String,
    label : String
});

const customerSchema = new Schema({
    customer_id: String,
    phone_number: String,
    payment_history: [
    {
        payment_id: String,
        payment_method: String,
        amount: Number,
        status: String,
        timestamp: Date
    }
    ],
    return_history: [
        {
            return_id: String,
            reason: String,
            status: String,
            timestamp: Date
        }
    ],
    delivery_history: [
    {
        delivery_id: String,
        delivery_address: String,
        status: String,
        timestamp: Date
    }
    ],
    conversations: [
    {
        conversation_id: String,
        timestamp: Date
    }
    ],
    order_history: [
    {
        order_id: String,
        timestamp: Date
    }
    ]
});


const orderSchema = new Schema({
    order_id: String,
    conversation_id: String,
    customer_id: String,
    products: [
        {
            product_id: String,
            product_name: String,
            quantity: Number,
            product_price: Number,
        }
    ],
    total_amount: Number,
    payment_status: String,
    delivery_address: String,
    delivery_status: String,
    timestamp: Date
});

const paymentSchema = new Schema({
    payment_id: String,
    order_id: String,
    customer_id: String,
    amount: Number,
    payment_method: String,
    timestamp: Date,
    status: String
});

const deliverySchema = new Schema({
    delivery_id: String,
    order_id: String,
    customer_id: String,
    delivery_address: String,
    deliverer_name: String,
    timestamp: Date,
    status: String
});

const returnSchema = new Schema({
    return_id: String,
    order_id: String,
    reason: String,
    status: String,
    timestamp: Date
});

module.exports = {
    Conversation: mongoose.model("Conversation", conversationSchema),
    Order: mongoose.model("Order", orderSchema),
    Customer: mongoose.model("Customer", customerSchema),
    Payment: mongoose.model("Payment", paymentSchema),
    Delivery: mongoose.model("Delivery", deliverySchema),
    Return: mongoose.model("Return", returnSchema)
};