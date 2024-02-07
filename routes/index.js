// const router = require("express").Router()

const endPoint = require("../docs/swagger/swagger.json");
const swaggerUI = require("swagger-ui-express");

const travelRouter = require("./travel")
const qualityTemplateRouter = require("./templates/quality")
const qualityRouter = require("./quality")

const setupRoutes = (app) => {
    app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(endPoint));
    app.use("/travel",travelRouter)
    app.use("/quality",qualityRouter)
    app.use("/template/quality", qualityTemplateRouter)
    
}


module.exports = setupRoutes