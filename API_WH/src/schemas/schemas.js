const mongoose = require("mongoose");


/**
 * @author STEVE
 */

const Schema = mongoose.Schema;

const conversationSchema = new Schema({
    conversation_id: String,
    customer_id: { type: Schema.Types.ObjectId, ref: "Customer" },
    timestamp: Date,
    messages: String,
    label: String
});

const customerSchema = new Schema({
    customer_id: String,
    phone_number: String,
    status: String,
    payment_history: [
        {
            payment_id: { type: Schema.Types.ObjectId, ref: "Payment" },
            payment_method: String,
            amount: Number,
            status: String,
            timestamp: Date
        }
    ],
    return_history: [
        {
            return_id: { type: Schema.Types.ObjectId, ref: "Return" },
            reason: String,
            status: String,
            timestamp: Date
        }
    ],
    delivery_history: [
        {
            delivery_id: { type: Schema.Types.ObjectId, ref: "Delivery" },
            delivery_address: String,
            status: String,
            timestamp: Date
        }
    ],
    conversation_history: [
        {
            conversation_id: { type: Schema.Types.ObjectId, ref: "Conversation" },
            timestamp: Date
        }
    ],
    order_history: [
        {
            order_id: { type: Schema.Types.ObjectId, ref: "Order" },
            timestamp: Date
        }
    ]
});

const orderSchema = new Schema({
    order_id: String,
    conversation_id: { type: Schema.Types.ObjectId, ref: "Conversation" },
    customer_id: { type: Schema.Types.ObjectId, ref: "Customer" },
    products: [
        {
            product_id: { type: Schema.Types.ObjectId, ref: "Product" },
            quantity: Number
        }
    ],
    total_amount: Number,
    payment_status: String,
    delivery_address: String,
    delivery_status: String,
    timestamp: Date
});

const productSchema = new Schema({
    payment_id: String,
    order_id: { type: Schema.Types.ObjectId, ref: "Order" },
    name: String,
    category: String,
    quantity: Number,
    price_unit: Number,
});

const paymentSchema = new Schema({
    payment_id: String,
    order_id: { type: Schema.Types.ObjectId, ref: "Order" },
    customer_id: { type: Schema.Types.ObjectId, ref: "Customer" },
    amount: Number,
    payment_method: String,
    timestamp: Date,
    status: String
});

const deliverySchema = new Schema({
    delivery_id: String,
    order_id: { type: Schema.Types.ObjectId, ref: "Order" },
    customer_id: { type: Schema.Types.ObjectId, ref: "Customer" },
    delivery_address: String,
    deliverer_name: String,
    timestamp: Date,
    status: String
});

const returnSchema = new Schema({
    return_id: String,
    order_id: { type: Schema.Types.ObjectId, ref: "Order" },
    reason: String,
    status: String,
    timestamp: Date
});

module.exports = {
    Conversation: mongoose.model("Conversation", conversationSchema),
    Order: mongoose.model("Order", orderSchema),
    Product: mongoose.model("Product", productSchema),
    Customer: mongoose.model("Customer", customerSchema),
    Payment: mongoose.model("Payment", paymentSchema),
    Delivery: mongoose.model("Delivery", deliverySchema),
    Return: mongoose.model("Return", returnSchema)
};