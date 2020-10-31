require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const moment = require('moment-timezone');

moment.locale('id');
moment.tz.setDefault('Asia/Jakarta');
const app = express();
const port = process.env.PORT || 3000;

global._ = require('lodash');
global.MISC = require("./src/infrastructures/configs/response");
global.MOMENT = moment

const logger = require('./src/infrastructures/logger/logger').requestLog
const connection = require('./src/infrastructures/orm/sequelize/sequelize').sequelize

const Router = require("./src/interfaces/routes/v1")
const ErrorlController = require("./src/interfaces/controllers/error");


app.use((req, res, next) => {
    connection
        .authenticate()
        .then(() => {
            next();
        })
        .catch(e => {
            return MISC.responses(res, {
                status: 500,
                message: "database connection not established."
            })
        });
});

app.use(logger)

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(ErrorlController().errorHandler);
app.use("/api", Router);
app.use(ErrorlController().notFound);

app.listen(port, () => {
    console.log(`Running at port :${port}`)
});