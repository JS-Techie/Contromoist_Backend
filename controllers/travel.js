const {
    Response,
    print,
    logType
} = require('../utils');
const db = require('../models');
const {
    travelService,
    projectService
} = require('../services');
const {
    Sequelize
} = require('sequelize');


class TravelController {

    async getAllRequisitions(req, res, next) {
        try {
            if (!req.user || !req.user.id) {
                return Response.errorUnauthorized()(res);
            }

            const isAdmin = req.user.isAdmin;

            const [data, ok] = await travelService.fetchAll(req.user.id, isAdmin)

            if (!ok) {
                return Response.errorGeneric([], data)(res);
            }

            return Response.successFetch(data)(res);

        } catch (error) {
            print(String(error), logType.error);
            return Response.errorGeneric([], error.message)(res);
        }
    }

    async getRequisitionById(req, res, next) {
        try {
            if (!req.user || !req.user.id) {
                return Response.errorUnauthorized()(res);
            }

            const requisitionId = req.params.id;

            if (!requisitionId) {
                return Response.errorGeneric([], 'Requisition ID Empty', 'This requisition ID doesn\'t exist or is invalid!')(res);
            }

            const isAdmin = req.user.isAdmin;

            const [data, ok] = await travelService.fetchById(requisitionId, req.user.id, isAdmin)

            if (!ok) {
                return Response.errorGeneric([], data)(res);
            }

            return Response.successFetch(data)(res);
        } catch (error) {
            print(String(error), logType.error);
            return Response.errorGeneric([], error.message)(res);
        }
    }

    async getRequisitionByProjectId(req, res, next) {
        try {
            const {
                project
            } = req.params;

            if (!req.user || !req.user.id) {
                return Response.errorUnauthorized()(res);
            }

            const isAdmin = req.user.isAdmin;

            const [data, ok] = await travelService.fetchByProjectId(req.user.id, project, isAdmin)

            if (!ok) {
                return Response.errorGeneric([], data)(res);
            }
            return Response.successFetch(data)(res);

        } catch (error) {
            print(String(error), logType.error);
            return Response.errorGeneric([], error.message)(res);
        }
    }

    async createRequisition(req, res, next) {
        const transaction = await db.sequelize.transaction();

        try {
            if (!req.user || !req.user.id) {
                return Response.errorUnauthorized()(res);
            }

            const {
                project,
                details
            } = req.body;

            if (!project) {
                return Response.errorGeneric([], 'Valid project ID not present', 'Please select a project to enter a new requisition!')(res);
            }

            const [error , resourceAssignedToProject] = await projectService.resourceAssignedToProject(projectId, req.user.id, req.user.isAdmin);

            if (!resourceAssignedToProject) {
                print(`USER ${req.user.id} WANTED TO CREATE NEW REQUISITION BUT UNAUTHORIZED`, logType.error);
                return Response.errorGeneric([], 'Not authorized for this project', 'You are not assigned to this project!')(res);
            }

            const [data, ok] = await travelService.createRequisition(project, details, req.user.id)

            if (!ok) {
                return Response.errorGeneric([], data)(res);
            }
            return Response.successCreate(data)(res);

        } catch (error) {
            await transaction.rollback();
            print(String(error), logType.error);
            return Response.errorGeneric([], error.message)(res);
        }
    }

    async editRequisition(req, res, next) {
        const transaction = await db.sequelize.transaction();

        try {
            if (!req.user || !req.user.id) {
                return Response.errorUnauthorized()(res);
            }

            const requisitionId = req.params.id;

            if (!requisitionId) {
                return Response.errorGeneric([], 'Requisition ID Empty', 'This requisition ID doesn\'t exist or is invalid!')(res);
            }

            const requisition = await travelService.fetchById(requisitionId, req.user.id, req.user.isAdmin)
            if (!requisition) {
                print('REQUISITION FETCHED BUT EMPTY', logType.warning);
                return Response.errorNotFound()(res);
            }

            const {
                project,
                details
            } = req.body

            if (!project) {
                return Response.errorGeneric([], 'Valid project ID not present', 'Please select a project to edit the requisition!')(res);
            }

            const [error , resourceAssignedToProject] = await projectService.resourceAssignedToProject(projectId,req.user.id, req.user.isAdmin);

            if (!resourceAssignedToProject) {
                print(`USER ${req.user.id} WANTED TO CREATE NEW REQUISITION BUT UNAUTHORIZED`, logType.error);
                return Response.errorGeneric([], 'Not authorized for this project', 'You are not assigned to this project!')(res);
            }

            if (!details || details.length === 0) {
                return Response.errorGeneric([], 'Details array is required and should not be empty', 'Please provide valid details for editing the requisition!')(res);
            }

            const [data, ok] = await travelService.editRequisition(requisitionId, req.user.id, details, project)

            if (!ok) {
                return Response.errorGeneric([], data)(res);
            }

            print(`USER ${req.user.id} EDITED REQUISITION`, logType.success);

            return Response.successUpdate(data)(res);

        } catch (error) {
            await transaction.rollback();
            print(String(error), logType.error);
            return Response.errorGeneric([], error.message)(res);
        }
    }

    async deleteRequisition(req, res, next) {
        const transaction = await db.sequelize.transaction();

        try {

            if (!req.user || !req.user.id) {
                return Response.errorUnauthorized()(res);
            }

            const [error , resourceAssignedToProject] = await projectService.resourceAssignedToProject(projectId,req.user.id, req.user.isAdmin);

            if (!resourceAssignedToProject) {
                print(`USER ${req.user.id} WANTED TO CREATE NEW REQUISITION BUT UNAUTHORIZED`, logType.error);
                return Response.errorGeneric([], 'Not authorized for this project', 'You are not assigned to this project!')(res);
            }

            const requisitionId = req.params.id;

            const [deletedRequisition, ok] = await travelService.deleteRequisition(requisitionId);

            if (!ok) {
                await transaction.rollback();
                return Response.errorGeneric([], deletedRequisition)(res);
            }

            await transaction.commit();
            return Response.deleteSuccess(deletedRequisition)(res);
        } catch (error) {
            await transaction.rollback();
            return Response.errorGeneric([], error.message)(res);
        }
    }

}

module.exports = new TravelController();
