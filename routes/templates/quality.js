const qualityRouter = require("express").Router()

const {authenticate} = require("../../middleware")
const {qualityTemplateController} = require("../../controllers")

qualityRouter.use(authenticate)

qualityRouter.route("/").get(qualityTemplateController.getAllTemplates)
qualityRouter.route("/:id").get(qualityTemplateController.getTemplateById)
qualityRouter.route("/:id").patch(qualityTemplateController.editTemplate)
qualityRouter.route("/:id").delete(qualityTemplateController.delete)

module.exports = qualityRouter