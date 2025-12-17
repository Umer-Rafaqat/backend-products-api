const express = require("express");
const router = express.Router();
const controller = require("../controllers/customers.controller");

router.post("/create", controller.createCustomer);
router.get("/", controller.getAllCustomers);
router.get("/:id", controller.getCustomerById);

module.exports = router;
