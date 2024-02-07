const qualityRouter = require("express").Router()

// const {authenticate} = require("../middleware")
const {qualityTemplateController} = require("../../controllers")


qualityRouter.route("/").get(qualityTemplateController.getAllTasks)
qualityRouter.route("/:id").get(qualityTemplateController.getTaskById)
qualityRouter.route("/").post(qualityTemplateController.createTask)
qualityRouter.route("/:id").patch(qualityTemplateController.editTask)
qualityRouter.route("/:id").delete(qualityTemplateController.deleteTask)

module.exports = qualityRouter