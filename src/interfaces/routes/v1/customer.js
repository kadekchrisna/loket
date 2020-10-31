const r = require("express").Router();

const db = require("../../../infrastructures/orm/sequelize/sequelize");
const customerRepo = require("../../../infrastructures/repositories/customer")

const customerUseCase = require("../../../applications/usecase/customer")

const customerController = require("../../controllers/customer")

const CustomerUseCase = new customerUseCase(new customerRepo(db.customer))

r.post("/customer/create", customerController(CustomerUseCase).createCustomer)

module.exports = r