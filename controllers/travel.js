const { Response, print, logType } = require('../utils');
const db = require("../models");

const Travel = db.Travel

class TravelController {
    getAllRequisitions = async (req, res, next) => {
        try {
            // Need to know how to check the user type
            const isAdmin = req.user && req.user.type === 'admin';

            let requisitions;

            if (isAdmin) {

                requisitions = await Travel.find();
            } else {

                if (!req.user.id) {
                    return Response.errorUnauthorized()(res);
                }

                requisitions = await Travel.find({ resource: req.user.id });
            }


            if (!requisitions || requisitions.length === 0) {
                print("REQUSITIONS FETCHED BUT EMPTY", logType.warning)
                return Response.errorNotFound()(res);
            }

            print("REQUSITIONS FETCHED", logType.success)

            return Response.successFetch(requisitions)(res);
        } catch (error) {
            print(str(error), logType.error)
            return Response.errorGeneric([], error.message)(res);
        }
    };

    getRequisitionById = async (req, res, next) => {
        try {
            const requisitionId = req.params.id;

            if (!requisitionId) {
                return Response.errorGeneric([], "Requisition ID Empty", "This requsition ID doesn't exist / is invalid!")(res)
            }
            // Need to know how to check the user type
            const isAdmin = req.user && req.user.type === 'admin';
            let requisition;

            if (isAdmin) {


                requisition = await Travel.findOne({ id: requisitionId });
            } else {

                if (!req.user.id) {
                    return Response.errorUnauthorized()(res);
                }

                requisition = await Travel.findOne({ id: requisitionId, resource: req.user.id });
            }

            if (!requisition) {
                print("REQUISITION FETCHED BUT EMPTY", logType.warning)
                return Response.errorNotFound()(res);
            }

            print("REQUSITION FETCHED", logType.success)


            return Response.successFetch(requisition)(res);

        } catch (error) {
            print(str(error), logType.error)
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
