const travelController = require("./travel")
const qualityTemplateController = require("./templates/quality")
const qualityController = require("./quality")
const projectController = require("./projects")
const projectTypeController = require("./project_types")
const projectResourceController = require("./project_resources")
const projectStatusController = require("./project_status")
const ProjectTemplateController = require("./templates/projects")

module.exports = {
    travelController,
    qualityTemplateController,
    qualityController,
    projectController,
    projectTypeController,
    projectResourceController,
    projectStatusController,
    ProjectTemplateController
}