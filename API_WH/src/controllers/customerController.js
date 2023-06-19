const express = require('express');
const { customerService } = require('../services/customerService');
const service = new customerService();

const createCustomer = async (req, res) => {
    try {
        const customer = await service.createCustomer(req.body);
        res.status(201).json(customer);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: e.message });
    }
};

const getCustomers = async (_, res) => {
    try {
        const customers = await service.getCustomers();
        res.status(200).json(customers);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: e.message });
    }
};

const getCustomerByNumber = async (req, res) => {
    try {
        const { customerNumber } = req.params;
        const customer = await service.getCustomerByNumber(customerNumber);
        res.status(200).json(customer);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: e.message });
    }
};

const updateCustomerByNumberLocked = async (req, res) => {
    try {
        const { customerNumber } = req.params;
        const customer = await service.updateCustomerByNumberLocked(customerNumber);
        res.status(200).json(customer);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: e.message });
    }
};

const updateCustomerByNumberUnlocked = async (req, res) => {
    try {
        const { customerNumber } = req.params;
        const customer = await service.updateCustomerByNumberUnlocked(customerNumber);
        res.status(200).json(customer);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: e.message });
    }
};

const addPaymentHistory = async (req, res) => {
    try {
        const { customerId, paymentData } = req.body;
        const customer = await service.addPaymentHistory(customerId, paymentData);
        res.status(200).json(customer);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: e.message });
    }
};

const getPaymentHistory = async (req, res) => {
    try {
        const { customerId } = req.params;
        const history = await service.getPaymentHistory(customerId);
        res.status(200).json(history);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: e.message });
    }
};


module.exports = {
    createCustomer,
    getCustomers,
    getCustomerByNumber,
    updateCustomerByNumberLocked,
    updateCustomerByNumberUnlocked,
    addPaymentHistory,
    getPaymentHistory
};