const express = require('express');
const { paymentService } = require('../services/paymentService');
const service = new paymentService();

const createPayment = async (req, res) => {
    try {
        const payment = await service.createPayment(req.body);
        res.status(201).json(payment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getPaymentsByCustomer = async (req, res) => {
    try {
        const { customerId } = req.params;
        const payments = await service.getPaymentsByCustomer(customerId);
        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getPaymentsByOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const payments = await service.getPaymentsByOrder(orderId);
        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getPaymentsBy = async (req, res) => {
    try {
        const { paymentID } = req.params;
        const payments = await service.getPaymentsBy(paymentID);
        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getPaymentsByName = async (req, res) => {
    try {
        const { paymentMethod } = req.params;
        const payments = await service.getPaymentsByName(paymentMethod);
        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateReturnStatusById = async (req, res) => {
    try {
        const { paymentId } = req.params;
        const { status } = req.body;
        const payment = await service.updateReturnStatusById(paymentId, status);
        res.status(200).json(payment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllPayments = async (_, res) => {
    try {
        const payments = await service.getAllPayments();
        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getPaymentsByDateRange = async (req, res) => {
    try {
        const { startDate, endDate } = req.params;
        const payments = await service.getPaymentsByDateRange(startDate, endDate);
        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createPayment,
    getPaymentsByCustomer,
    getPaymentsByOrder,
    getPaymentsBy,
    getPaymentsByName,
    updateReturnStatusById,
    getAllPayments,
    getPaymentsByDateRange
};