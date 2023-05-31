const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');

const Schema = mongoose.Schema;

const conversationSchema = new Schema({
    conversation_id: { type: String, default: uuidv4 },
    customer_id: {type: String, ref: "Customer" },
    timestamp: { type: Date, default: Date.now },
    messages: {type: String,required:true},
    label : {type: String,required:true}
});

const customerSchema = new Schema({
    customer_id: { type: String, default: uuidv4 },
    phone_number: {type: String,required:true},
    status: { type: String, default: "A", enum: ['A', 'I', 'B']},
    payment_history: [
        {
            payment_id: { type: String, ref: "Payment" },
            payment_method: String,
            amount: Number,
            status: String,
            timestamp: Date
        }
    ],
    return_history: [
        {
            return_id: { type: String, ref: "Return" },
            reason: String,
            status: String,
            timestamp: Date
        }
    ],
    delivery_history: [
        {
            delivery_id: { type: String, ref: "Delivery" },
            delivery_address: String,
            status: String,
            timestamp: Date
        }
    ],
    conversation_history: [
        {
            conversation_id: { type: String, ref: "Conversation" },
            timestamp: Date
        }
    ],
    order_history: [
        {
            order_id: { type: String, ref: "Order" },
            timestamp: Date
        }
    ]
});

const orderSchema = new Schema({
    order_id: { type: String, default: uuidv4 },
    customer_id: { type: String, ref: "Customer" },
    products: [
        {
            //product_id: { type: Schema.Types.ObjectId, ref: "Product" },
            name: {type: String,required:true},
            quantity: {
                type: Number,
                required: true,
                min: [1, 'Quantity cannot be less than 1.'],
                max: [5, 'Quantity cannot be more than 5.']
            },
            price : {
                type: Number,
                required: true,
                min: [0, 'Quantity cannot be less than 1.']
            }
        }
    ],
    total_amount: {
        type: Number,
        required: true,
        min: [0, 'Total amount cannot be less than 0.']
    },
    status: { type: String, default: "P", enum: ['P', 'A', 'R'] },
    payment_status: { type: String, default: "P", enum: ['P', 'A', 'R'] },
    delivery_address: {type: String},
    delivery_status: { type: String, default: "P", enum: ['P', 'A', 'R'] },
    timestamp: { type: Date, default: Date.now }
});

const productSchema = new Schema({
    payment_id: { type: String, default: uuidv4 },
    order_id: { type: String, ref: "Order" },
    name: {type: String,required:true},
    category: {type: String,required:true},
    quantity: {
        type: Number,
        required: true,
        min: [1, 'Quantity cannot be less than 1.'],
        max: [5, 'Quantity cannot be more than 5.']
    },
    price_unit: {
        type: Number,
        required: true,
        min: [0, 'Price per unit cannot be less than 0.']
    },
});


const paymentSchema = new Schema({
    payment_id: { type: String, default: uuidv4 },
    order_id: { type: String, ref: "Order" },
    customer_id: { type: String, ref: "Customer" },
    amount: {
        type: Number,
        required: true,
        min: [0, 'Total amount cannot be less than 0.']
    },
    payment_method: {type: String,required:true},
    timestamp: { type: Date, default: Date.now },
    status: { type: String, default: "P", enum: ['P', 'A', 'R'] },
});

const deliverySchema = new Schema({
    delivery_id: { type: String, default: uuidv4 },
    order_id: { type: String, ref: "Order" },
    customer_id: { type: String, ref: "Customer" },
    delivery_address: {type: String,required:true},
    deliverer_name: {type: String,required:true},
    timestamp: { type: Date, default: Date.now },
    status: { type: String, default: "P", enum: ['P', 'A', 'R'] },
});

const returnSchema = new Schema({
    return_id: { type: String, default: uuidv4 },
    order_id: { type: String, ref: "Order" },
    reason: {type: String,required:true},
    status: { type: String, default: "P", enum: ['P', 'A', 'R'] },
    timestamp: { type: Date, default: Date.now }
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