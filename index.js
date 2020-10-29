require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");

const logger = require('./src/infrastructures/logger/logger').requestLog
const connection = require('./src/infrastructures/orm/sequelize/sequelize').sequelize

const app = express();
const port = process.env.PORT || 3000;

app.use((req, res, next) => {
    connection
        .authenticate()
        .then(() => {
            next();
        })
        .catch(e => {
            res.status(500).send({
                code: 9999,
                message: "database connection not established."
            })

        });
});

app.use(logger)

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(port, () => {
    console.log(`Running at port :${port}`)
});