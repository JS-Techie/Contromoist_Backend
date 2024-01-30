const travelRouter = require("express").Router()

// const {authenticate} = require("../middleware")
const {travelController} = require("../controllers")

travelRouter.route("/").get(travelController.getAllRequisitions)
travelRouter.route("/:id").get(travelController.getRequisitionById)
travelRouter.route("/").post(travelController.createRequisition)
travelRouter.route("/:id").patch(travelController.editRequisition)
travelRouter.route("/:id").delete(travelController.deleteRequisition)
travelRouter.route("/:project").get(travelController.getRequisitionByProjectId)




module.exports = travelRouter