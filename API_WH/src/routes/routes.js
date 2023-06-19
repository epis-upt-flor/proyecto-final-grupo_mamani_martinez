const express = require("express");
const router = express.Router();
const whatsappController = require("../controllers/whatsappControllers");
const orderController = require("../controllers/orderController");
const customerController = require("../controllers/customerController");
const deliveryController = require("../controllers/deliveryController");
const paymentController = require("../controllers/paymentController");
const returnController = require("../controllers/returnController");

// Rutas para WhatsApp
router.get("/", whatsappController.handleVerification);
router.post("/", whatsappController.receivedMessage);

// Rutas para las órdenes
router.get("/order/list", orderController.getAllOrders);
router.post("/order", orderController.createOrder);
router.put("/order/:orderId", orderController.updateOrderStatusById);

// Rutas para los clientes
router.post("/customer", customerController.createCustomer);
router.get("/customer", customerController.getCustomers);
router.get("/customer/:customerNumber", customerController.getCustomerByNumber);
router.put("/customer/locked/:customerNumber", customerController.updateCustomerByNumberLocked);
router.put("/customer/unlocked/:customerNumber", customerController.updateCustomerByNumberUnlocked);
router.post("/customer/payment", customerController.addPaymentHistory);
router.get("/customer/payment/:customerId", customerController.getPaymentHistory);

// Rutas para los envíos
router.post("/delivery", deliveryController.createDelivery);
router.get("/delivery", deliveryController.getAllDeliveries);
router.get("/delivery/:deliveryId", deliveryController.getDeliveryById);
router.get("/delivery/address/:deliveryAddress", deliveryController.getDeliveryByAddress);
router.put("/delivery/:deliveryId", deliveryController.updateDeliveryById);
router.delete("/delivery/:deliveryId", deliveryController.deleteDeliveryById);

// Rutas para los pagos
router.post("/payment", paymentController.createPayment);
router.get("/payment/customer/:customerId", paymentController.getPaymentsByCustomer);
router.get("/payment/order/:orderId", paymentController.getPaymentsByOrder);
router.get("/payment/:paymentId", paymentController.getPaymentsBy);
router.get("/payment/method/:paymentMethod", paymentController.getPaymentsByName);
router.put("/payment/:paymentId/status", paymentController.updateReturnStatusById);
router.get("/payment", paymentController.getAllPayments);
router.get("/payment/date-range", paymentController.getPaymentsByDateRange);

// Rutas para las devoluciones
router.post("/return", returnController.createReturn);
router.get("/return", returnController.getAllReturns);
router.get("/return/:returnId", returnController.getReturnById);
router.put("/return/:returnId/status", returnController.updateReturnStatusById);
router.delete("/return/:returnId", returnController.deleteReturnById);

module.exports = router;
