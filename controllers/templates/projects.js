const {
    Response,
    print,
    logType
} = require('../../utils');
const db = require('../../models');
const {
    projectTemplateService
} = require('../../services');
const {
    Sequelize
} = require('sequelize');

class ProjectTemplateController {

    async fetchAll(req, res, next) {
        try {
            if (!req.user || !req.user.id) {
                return Response.errorUnauthorized()(res);
            }

            const type = req.query.type == undefined ? null : req.query.type

            const [data, ok] = await projectTemplateService.fetchAll(type)

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

            const projectTemplateId = req.params.id;

            if (!projectTemplateId) {
                return Response.errorGeneric([], 'Project Template ID Empty', 'This project Type Template ID doesn\'t exist or is invalid!')(res);
            }

            const [data, ok] = await projectTemplateService.fetchById(projectTemplateId)

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

            const { projectTemplateDetails } = req.body

            const [data, ok] = await projectTemplateService.create(projectTemplateDetails, req.user.id)

            if (!ok) {
                return Response.errorGeneric(data)(res)
            }

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

            const { projectTemplateDetails } = req.body
            const projectTemplateId = req.params.id

            const [data, ok] = await projectTemplateService.edit(projectTemplateId, projectTemplateDetails, req.user.id)

            if (!ok) {
                return Response.errorGeneric(data)(res)
            }

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

            const projectTemplateId = req.params.id

            const [data, ok] = await projectTemplateService.delete(projectTemplateId, req.user.id)

            if (!ok) {
                return Response.errorGeneric(data)(res)
            }

        } catch (error) {
            await transaction.rollback();
            print(String(error), logType.error);
            return Response.errorGeneric([], error.message)(res);
        }
    }

}

module.exports = new ProjectTemplateController();
