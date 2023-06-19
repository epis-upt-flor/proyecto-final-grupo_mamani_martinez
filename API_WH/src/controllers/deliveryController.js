const express = require('express');
const { deliveryService } = require('../services/deliveryService');
const service = new deliveryService();

const createDelivery = async (req, res) => {
    try {
        const delivery = await service.createDelivery(req.body);
        res.status(201).json(delivery);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllDeliveries = async (_, res) => {
    try {
        const deliveries = await service.getAllDeliveries();
        res.status(200).json(deliveries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getDeliveryById = async (req, res) => {
    try {
        const deliveryId = req.params.deliveryId;
        const delivery = await service.getDeliveryById(deliveryId);
        res.status(200).json(delivery);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getDeliveryByAddress = async (req, res) => {
    try {
        const deliveryAddress = req.params.deliveryAddress;
        const delivery = await service.getDeliveryByAddress(deliveryAddress);
        res.status(200).json(delivery);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const updateDeliveryById = async (req, res) => {
    try {
        const deliveryId = req.params.deliveryId;
        const deliveryData = req.body;
        const updatedDelivery = await service.updateDeliveryById(deliveryId, deliveryData);
        res.status(200).json(updatedDelivery);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteDeliveryById = async (req, res) => {
    try {
        const deliveryId = req.params.deliveryId;
        const deletedDelivery = await service.deleteDeliveryById(deliveryId);
        res.status(200).json(deletedDelivery);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createDelivery,
    getAllDeliveries,
    getDeliveryById,
    getDeliveryByAddress,
    updateDeliveryById,
    deleteDeliveryById
};