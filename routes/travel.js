const travelRouter = require("express").Router()

const {authenticate} = require("../middleware")
const {travelController} = require("../controllers")


travelRouter.use(authenticate)

travelRouter.route("/").get(travelController.getAllRequisitions)
travelRouter.route("/:id").get(travelController.getRequisitionById)
travelRouter.route("/:id").get(travelController.getClaimById)
travelRouter.route("/").post(travelController.createRequisition)
travelRouter.route("/:id").patch(travelController.editRequisition)
travelRouter.route("/:id").delete(travelController.deleteRequisition)
travelRouter.route("/:id").delete(travelController.deleteClaim)
travelRouter.route("/:project").get(travelController.getRequisitionByProjectId)


module.exports = travelRouter