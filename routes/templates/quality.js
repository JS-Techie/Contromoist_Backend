const qualityRouter = require("express").Router()

// const {authenticate} = require("../middleware")
const {qualityTemplateController} = require("../../controllers")

qualityRouter.route("/").get(qualityTemplateController.getAllTemplates)
qualityRouter.route("/:id").get(qualityTemplateController.getTemplateById)
qualityRouter.route("/task").get(qualityTemplateController.getAllTasks)
qualityRouter.route("/task/:id").get(qualityTemplateController.getTaskById)
qualityRouter.route("/").post(qualityTemplateController.createTask)
qualityRouter.route("/:id").patch(qualityTemplateController.editTemplate)
qualityRouter.route("/task/:id").patch(qualityTemplateController.editTask)
qualityRouter.route("/:id").delete(qualityTemplateController.delete)

module.exports = qualityRouter