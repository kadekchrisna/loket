const r = require("express").Router();

const db = require("../../../infrastructures/orm/sequelize/sequelize");
const transRepo = require("../../../infrastructures/repositories/transaction")
const orderRepo = require("../../../infrastructures/repositories/order")
const customerRepo = require("../../../infrastructures/repositories/customer")
const ticketRepo = require("../../../infrastructures/repositories/ticket")

const transUseCase = require("../../../applications/usecase/transaction")

const transController = require("../../controllers/transaction")

const TransUseCase = new transUseCase(new transRepo(db.transaction, db.order, db.ticket, db.event), new orderRepo(db.order), new customerRepo(db.customer), new ticketRepo(db.ticket), db.sequelize)

r.get("/transaction/get_info/:id", transController(TransUseCase).getTransaction)
r.post("/transaction/purchase", transController(TransUseCase).createTransaction)

module.exports = r