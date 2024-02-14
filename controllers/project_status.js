const {
    Response,
    print,
    logType
} = require('../utils');
const db = require('../models');
const {
    projectService,
    projectStatusService
} = require('../services');
const {
    Sequelize
} = require('sequelize');

class ProjectStatusController {

    async fetchAll(req, res, next) {
        try {
            if (!req.user || !req.user.id) {
                return Response.errorUnauthorized()(res);
            }

            const type = req.query.type == undefined ? null : req.query.type
            const alertType = req.query.alertType == undefined ? null : req.query.alertType

            const [data, ok] = await projectStatusService.fetchAll(type, alertType)

            if (!ok) {
                return Response.errorGeneric([], data)(res);
            }

            return Response.successFetch(data)(res);

        } catch (error) {
            print(String(error), logType.error);
            return Response.errorGeneric([], error.message)(res);
        }
    }

    async fetchById(req, res, next) {
        try {
            if (!req.user || !req.user.id) {
                return Response.errorUnauthorized()(res);
            }

            const projectStatusId = req.params.id;

            if (!projectStatusId) {
                return Response.errorGeneric([], 'Project Status ID Empty', 'This project Type Status ID doesn\'t exist or is invalid!')(res);
            }

            const [data, ok] = await projectStatusService.fetchById(projectStatusId)

            if (!ok) {
                return Response.errorGeneric([], data)(res);
            }

            return Response.successFetch(data)(res);
        } catch (error) {
            print(String(error), logType.error);
            return Response.errorGeneric([], error.message)(res);
        }
    }

    async create(req, res, next) {
        const transaction = await db.sequelize.transaction();

        try {
            if (!req.user || !req.user.id) {
                return Response.errorUnauthorized()(res);
            }

            const projectStatusDetails = req.body

            const [data, ok] = await projectStatusService.create(projectStatusDetails, req.user.id)

            if (!ok) {
                return Response.errorGeneric(data)(res)
            }

            return Response.successCreate(data)(res);

        } catch (error) {
            await transaction.rollback();
            print(String(error), logType.error);
            return Response.errorGeneric([], error.message)(res);
        }
    }

    async edit(req, res, next) {
        const transaction = await db.sequelize.transaction();

        try {
            if (!req.user || !req.user.id) {
                return Response.errorUnauthorized()(res);
            }

            const projectStatusDetails = req.body
            const projectStatusId = req.params.id

            const [data, ok] = await projectStatusService.edit(projectStatusId, projectStatusDetails, req.user.id)

            if (!ok) {
                return Response.errorGeneric(data)(res)
            }

            return Response.editSuccess(data)(res)

        } catch (error) {
            await transaction.rollback();
            print(String(error), logType.error);
            return Response.errorGeneric([], error.message)(res);
        }
    }

    async delete(req, res, next) {
        const transaction = await db.sequelize.transaction();

        try {
            if (!req.user || !req.user.id) {
                return Response.errorUnauthorized()(res);
            }

            const projectStatusId = req.params.id

            const [data, ok] = await projectStatusService.delete(projectStatusId, req.user.id)

            if (!ok) {
                return Response.errorGeneric(data)(res)
            }

            return Response.deleteSuccess(data)(res);

        } catch (error) {
            await transaction.rollback();
            print(String(error), logType.error);
            return Response.errorGeneric([], error.message)(res);
        }
    }

}

module.exports = new ProjectStatusController();
