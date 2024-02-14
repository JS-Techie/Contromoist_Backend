const endPoint = require("../docs/swagger/swagger.json");
const swaggerUI = require("swagger-ui-express");

const travelRouter = require("./travel")
const qualityTemplateRouter = require("./templates/quality")
const qualityTemplateTaskRouter = require("./templates/quality_tasks")
const qualityRouter = require("./quality")
const projectRouter = require("./projects")
const projectTemplateRouter = require("./templates/projects")
const projectTypeRouter = require("./project_types")
const projectResourceRouter = require("./project_resources")
const projectStatusRouter = require("./project_status")

const setupRoutes = (app) => {

    app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(endPoint));
    app.use("/api/travel",travelRouter)
    app.use("/api/quality",qualityRouter)
    app.use("/api/template/quality", qualityTemplateRouter)
    app.use("/api/template/quality/task", qualityTemplateTaskRouter)
    app.use("/api/project",projectRouter)
    app.use("/api/project/type",projectTypeRouter)
    app.use("/api/project/resource",projectResourceRouter)
    app.use("/api/project/status", projectStatusRouter)
    app.use("/api/template/project",projectTemplateRouter)
    
}


module.exports = setupRoutes