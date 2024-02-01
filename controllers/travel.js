const { Response, print,logType } = require('../utils');
const db = require("../models");

const Travel = db.Travel

class TravelController {
    getAllRequisitions = async (req, res, next) => {
        try {
            // Need to know how to check the user type
            const isAdmin = req.user && req.user.type === 'admin';
    
            let requisitions;
    
            if (isAdmin) {
                // Fetch all requisitions for admin
                requisitions = await Travel.find();
            } else {
                // Fetch requisitions based on the query for non-admin users
                if (!req.user.id) {
                    return Response.errorUnauthorized()(res);
                }
    
                requisitions = await Travel.find({ resource: req.user.id });
            }
            
            // Check if requisitions are empty
            if (!requisitions || requisitions.length === 0) {
                print("REQUSITIONS FETCHED BUT EMPTY",logType.warning)
                return Response.errorNotFound()(res);
            }
            
            print("REQUSITIONS FETCHED",logType.success)

            return Response.successFetch(requisitions)(res);
        } catch (error) {
            print(str(error),logType.error)
            return Response.errorGeneric([], error.message)(res);
        }
    };

    getRequisitionById = async (req, res, next) => {
        try {
            const requisitionId = req.params.id;
            const requisition = await Travel.findOne({ _id: requisitionId, userId: req.userId });

            if (!requisition) {
                return Response.errorNotFound([], "Requisition not found")(res);
            }

            return Response.successFetch(requisition)(res);
        } catch (error) {
            return Response.errorGeneric([], error.message)(res);

        }
    }

    getRequisitionByProjectId = async (req, res, next) => {
        try {
            const projectId = req.params.project;
            const requisitions = await Travel.find({ projectId, userId: req.userId });
            return Response.successFetch(requisitions)(res);
        } catch (error) {
            return Response.errorGeneric([], error.message)(res);
        }
    }

    createRequisition = async (req, res, next) => {
        try {
            const newRequisitionData = { ...req.body, userId: req.userId };
            const newRequisition = await Travel.create(newRequisitionData);
            return Response.successCreate(newRequisition)(res);
        } catch (error) {
            return Response.errorGeneric([], error.message)(res);
        }
    }

    editRequisition = async (req, res, next) => {
        try {
            const requisitionId = req.params.id;
            const updatedRequisitionData = req.body;
            const updatedRequisition = await Travel.findOneAndUpdate(
                { _id: requisitionId, userId: req.userId },
                updatedRequisitionData,
                { new: true }
            );

            if (!updatedRequisition) {
                return Response.errorNotFound([], "Requisition not found")(res);
            }

            return Response.editSuccess(updatedRequisition)(res);
        } catch (error) {
            return Response.errorGeneric([], error.message)(res);
        }
    }

    deleteRequisition = async (req, res, next) => {
        try {
            const requisitionId = req.params.id;
            const deletedRequisition = await Travel.findOneAndDelete({ _id: requisitionId, userId: req.userId });

            if (!deletedRequisition) {
                return Response.errorNotFound([], "Requisition not found")(res);
            }

            return Response.deleteSuccess(deletedRequisition)(res);
        } catch (error) {
            return Response.errorGeneric([], error.message)(res);
        }
    }
}

module.exports = new TravelController();
