const qualityTaskRouter = require("express").Router()

const {authenticate} = require("../../middleware")
const {qualityTemplateController} = require("../../controllers")

qualityTaskRouter.use(authenticate)

qualityTaskRouter.route("/").get(qualityTemplateController.getAllTasks)
qualityTaskRouter.route("/:id").get(qualityTemplateController.getTaskById)
qualityTaskRouter.route("/").post(qualityTemplateController.createTask)
qualityTaskRouter.route("/:id").patch(qualityTemplateController.editTask)

module.exports = qualityTaskRouter