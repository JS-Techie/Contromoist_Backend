const projectTemplateRouter = require("express").Router()

projectTemplateRouter.route("/").get()
projectTemplateRouter.route("/:id").get()
projectTemplateRouter.route("/").post()
projectTemplateRouter.route("/:id").patch()
projectTemplateRouter.route("/:id").delete()


module.exports = projectTemplateRouter