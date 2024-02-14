const qualityRouter = require("express").Router()

const {authenticate} = require("../middleware")
const {qualityController} = require("../controllers")


qualityRouter.use(authenticate)

qualityRouter.route("/").get(qualityController.getAllTasks)
qualityRouter.route("/:id").get(qualityController.getTaskById)
qualityRouter.route("/").post(qualityController.createTask)
qualityRouter.route("/add/").post(qualityController.addTask)
qualityRouter.route("/").patch(qualityController.editTask)
qualityRouter.route("/:id").delete(qualityController.deleteTask)

module.exports = qualityRouter