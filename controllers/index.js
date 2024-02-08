const travelController = require("./travel")
const qualityTemplateController = require("./templates/quality")
const qualityController = require("./quality")
const projectController = require("./projects")
const projectTypeController = require("./project_types")
const projectResourceController = require("./project_resources")

module.exports = {
    travelController,
    qualityTemplateController,
    qualityController,
    projectController,
    projectTypeController,
    projectResourceController
}