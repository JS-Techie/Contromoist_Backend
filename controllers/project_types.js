const {
    Response,
    print,
    logType
} = require('../utils');
const db = require('../models');
const {
    projectTypeService
} = require('../services');
const {
    Sequelize
} = require('sequelize');

class ProjectTypeController {

    async fetchAll(req, res, next) {
        try {
            if (!req.user || !req.user.id) {
                return Response.errorUnauthorized()(res);
            }

            const [data, ok] = await projectTypeService.fetchAll()

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

            const projectTypeId = req.params.id;

            if (!projectTypeId) {
                return Response.errorGeneric([], 'Project ID Empty', 'This project Type ID doesn\'t exist or is invalid!')(res);
            }

            const [data, ok] = await projectTypeService.fetchById(projectTypeId)

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

            const projectTypeDetails = req.body

            const [data, ok] = await projectTypeService.create(projectTypeDetails, req.user.id)

            if (!ok) {
                return Response.errorGeneric(data)(res)
            }

            return Response.successCreate(data)(res)


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

            const projectTypeDetails = req.body
            const projectTypeId = req.params.id

            const [data, ok] = await projectTypeService.edit(projectTypeId, projectTypeDetails, req.user.id)

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

            const projectTypeId = req.params.id

            const [data, ok] = await projectTypeService.delete(projectTypeId, req.user.id)

            if (!ok) {
                return Response.errorGeneric(data)(res)
            }

            return Response.deleteSuccess(data)(res)

        } catch (error) {
            await transaction.rollback();
            print(String(error), logType.error);
            return Response.errorGeneric([], error.message)(res);
        }
    }

}

module.exports = new ProjectTypeController();
