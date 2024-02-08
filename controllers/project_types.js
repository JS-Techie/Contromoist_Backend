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

            const [error , resourceAssignedToProject] = await projectTypeService.resourceAssignedToProject(projectId, req.user.id, isAdmin);

            if (!resourceAssignedToProject) {
                print(`USER ${req.user.id} WANTED TO CREATE NEW PROJECT TYPE BUT UNAUTHORIZED`, logType.error);
                return Response.errorGeneric([], 'Not authorized for this project', 'You are not assigned to this project!')(res);
            }

            const projectTypeDetails = req.body

            const [data, ok] = await projectTypeService.create(projectTypeDetails)

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

            const [error , resourceAssignedToProject] = await projectTypeService.resourceAssignedToProject(projectId, req.user.id, isAdmin);

            if (!resourceAssignedToProject) {
                print(`USER ${req.user.id} WANTED TO EDIT PROJECT TYPE BUT UNAUTHORIZED`, logType.error);
                return Response.errorGeneric([], 'Not authorized for this project', 'You are not assigned to this project!')(res);
            }

            const projectTypeDetails = req.body
            const projectTypeId = req.params.id

            const [data, ok] = await projectTypeService.edit(projectTypeId, projectTypeDetails)

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

            const [error , resourceAssignedToProject] = await projectTypeService.resourceAssignedToProject(projectId, req.user.id, isAdmin);

            if (!resourceAssignedToProject) {
                print(`USER ${req.user.id} WANTED TO DELETE A PROJECT TYPE BUT UNAUTHORIZED`, logType.error);
                return Response.errorGeneric([], 'Not authorized for this project', 'You are not assigned to this project!')(res);
            }

            const projectTypeId = req.params.id

            const [data, ok] = await projectTypeService.delete(projectTypeId)

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

module.exports = new ProjectTypeController();
