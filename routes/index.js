const router = require("express").Router()
const endPoint = require("../docs/swagger/swagger.json");
const swaggerUI = require("swagger-ui-express");

const setupRoutes = (app) => {

    app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(endPoint));
}


module.exports = setupRoutes