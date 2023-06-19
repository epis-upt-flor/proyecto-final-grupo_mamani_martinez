const express = require('express');
const { orderService } = require('../services/orderService');
const service = new orderService();

const getAllOrders = async (_, res) => {
    try {
        const orders = await service.getAllOrders();
        res.status(200).json(orders);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: e.message });
    }
};

const createOrder = async (req, res) => {
    try {
        const order = await service.createOrder(req.body);
        res.status(201).json(order);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: e.message });
    }
};

const updateOrderPaymentID = async (req, res) => {
    try {
        const { orderId, paymentId } = req.body;
        const order = await service.updateOrderPaymentID(orderId, paymentId);
        res.status(200).json(order);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: e.message });
    }
};

const getOrdersByCustomerId = async (req, res) => {
    try {
        const { customerId } = req.params;
        const orders = await service.getOrdersByCustomerId(customerId);
        res.status(200).json(orders);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: e.message });
    }
};

const updateOrderStatusById = async (req, res) => {
    try {
        const { orderId, newStatus } = req.body;
        const order = await service.updateOrderStatusById(orderId, newStatus);
        res.status(200).json(order);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: e.message });
    }
};

const updateOrderProductStatusById = async (req, res) => {
    try {
        const { orderId, newStatus } = req.body;
        const order = await service.updateOrderProductStatusById(orderId, newStatus);
        res.status(200).json(order);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: e.message });
    }
};


module.exports = {
    getAllOrders,
    createOrder,
    updateOrderPaymentID,
    getOrdersByCustomerId,
    updateOrderStatusById,
    updateOrderProductStatusById
};