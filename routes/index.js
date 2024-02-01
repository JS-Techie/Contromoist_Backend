// const router = require("express").Router()

const endPoint = require("../docs/swagger/swagger.json");
const swaggerUI = require("swagger-ui-express");

const travelRouter = require("./travel")

const setupRoutes = (app) => {
    app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(endPoint));
    app.use("/travel",travelRouter)
    
}


module.exports = setupRoutes