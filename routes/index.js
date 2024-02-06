const endPoint = require("../docs/swagger/swagger.json");
const swaggerUI = require("swagger-ui-express");

const travelRouter = require("./travel")
const projectRouter = require("./projects")
const projectTemplateRouter = require("./templates/projects")

const setupRoutes = (app) => {

    app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(endPoint));
    app.use("/api/travel",travelRouter)
    app.use("/api/project",projectRouter)
    app.use("/api/template/project",projectTemplateRouter)
    
}


module.exports = setupRoutes