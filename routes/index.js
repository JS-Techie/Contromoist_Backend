const endPoint = require("../docs/swagger/swagger.json");
const swaggerUI = require("swagger-ui-express");

const travelRouter = require("./travel")
const qualityTemplateRouter = require("./templates/quality")
const qualityRouter = require("./quality")
const projectRouter = require("./projects")
const projectTemplateRouter = require("./templates/projects")
const projectTypeRouter = require("./project_types")
const projectResourceRouter = require("./project_resources")

const setupRoutes = (app) => {

    app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(endPoint));
    app.use("/travel",travelRouter)
    app.use("/quality",qualityRouter)
    app.use("/template/quality", qualityTemplateRouter)
    app.use("/api/travel",travelRouter)
    app.use("/api/project",projectRouter)
    app.use("/api/project/type",projectTypeRouter)
    app.use("/api/project/resource",projectResourceRouter)
    app.use("/api/template/project",projectTemplateRouter)
    
}


module.exports = setupRoutes