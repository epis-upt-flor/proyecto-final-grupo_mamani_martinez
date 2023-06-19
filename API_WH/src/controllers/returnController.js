const express = require('express');
const { returnService } = require('../services/returnService');
const service = new returnService();

const createReturn = async (req, res) => {
    try {
        const returnData = req.body;
        const returnObj = await service.createReturn(returnData);
        res.status(201).json(returnObj);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllReturns = async (_, res) => {
    try {
        const returns = await service.getAllReturns();
        res.status(200).json(returns);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getReturnById = async (req, res) => {
    try {
        const { returnId } = req.params;
        const returnObj = await service.getReturnById(returnId);
        res.status(200).json(returnObj);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateReturnStatusById = async (req, res) => {
    try {
        const { returnId } = req.params;
        const { newStatus } = req.body;
        const returnObj = await service.updateReturnStatusById(returnId, newStatus);
        res.status(200).json(returnObj);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteReturnById = async (req, res) => {
    try {
        const { returnId } = req.params;
        const returnObj = await service.deleteReturnById(returnId);
        res.status(200).json(returnObj);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createReturn,
    getAllReturns,
    getReturnById,
    updateReturnStatusById,
    deleteReturnById
};