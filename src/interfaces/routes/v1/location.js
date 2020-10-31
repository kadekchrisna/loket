const r = require("express").Router();

const db = require("../../../infrastructures/orm/sequelize/sequelize");
const locRepo = require("../../../infrastructures/repositories/location")
const locUseCase = require("../../../applications/usecase/location")
const locController = require("../../controllers/location")

const LocUseCase = new locUseCase(new locRepo(db.location, db.event))

r.get("/location/all", locController(LocUseCase).getLocations)
r.post("/location/create", locController(LocUseCase).createLocation)

module.exports = r