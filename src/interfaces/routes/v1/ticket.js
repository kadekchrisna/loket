const r = require("express").Router();

const db = require("../../../infrastructures/orm/sequelize/sequelize");
const ticketRepo = require("../../../infrastructures/repositories/ticket")
const eventRepo = require("../../../infrastructures/repositories/event")

const ticketUseCase = require("../../../applications/usecase/ticket")

const ticketController = require("../../controllers/ticket")

const TicketUseCase = new ticketUseCase(new ticketRepo(db.ticket), new eventRepo(db.event, db.location, db.ticket))

r.get("/event/ticket/:id", ticketController(TicketUseCase).getTicket)
r.post("/event/ticket/create", ticketController(TicketUseCase).createTicket)

module.exports = r