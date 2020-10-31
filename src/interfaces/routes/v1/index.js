const r = require("express").Router();
const EventRoute = require("./event")
const LocationRoute = require("./location")
const TicketRoute = require("./ticket")
const CustomerRoute = require("./customer")
const TransactionRoute = require("./transaction")

r.use("/", EventRoute);
r.use("/", LocationRoute);
r.use("/", TicketRoute);
r.use("/", CustomerRoute);
r.use("/", TransactionRoute);

module.exports = r