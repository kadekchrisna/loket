const r = require("express").Router();

const db = require("../../../infrastructures/orm/sequelize/sequelize");
const eventRepo = require("../../../infrastructures/repositories/event")
const locRepo = require("../../../infrastructures/repositories/location")

const eventUseCase = require("../../../applications/usecase/event")

const eventController = require("../../controllers/event")

const EventUseCase = new eventUseCase(new eventRepo(db.event, db.location, db.ticket), new locRepo(db.location, db.event))

r.get("/event/all", eventController(EventUseCase).getEvents)
r.get("/event/get_info/:id", eventController(EventUseCase).getEvent)
r.post("/event/create", eventController(EventUseCase).createEvent)

module.exports = r