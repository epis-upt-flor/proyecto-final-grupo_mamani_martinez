const Customer = require("../schemas/schemas").Customer;

const createCustomer = async (customerData) => {
    try {
        const customer = new Customer(customerData);
        const result = await customer.save();
        return result;
    } catch (error) {
        throw error;
    }
};

const getCustomers = async () => {
    try {
        const customers = await Customer.find({});
        return customers;
    } catch (error) {
        throw error;
    }
};

const getCustomerById = async (customerId) => {
    try {
        const customer = await Customer.findById(customerId);
        return customer;
    } catch (error) {
        throw error;
    }
};

const updateCustomerById = async (customerId, customerData) => {
    try {
        const result = await Customer.updateOne({ _id: customerId }, customerData);
        return result;
    } catch (error) {
        throw error;
    }
};

const deleteCustomerById = async (customerId) => {
    try {
        const result = await Customer.deleteOne({ _id: customerId });
        return result;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createCustomer,
    getCustomers,
    getCustomerById,
    updateCustomerById,
    deleteCustomerById
};
