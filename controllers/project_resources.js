const {
    Response,
    print,
    logType
} = require('../utils');
const db = require('../models');
const {
    projectResourceService
} = require('../services');
const {
    Sequelize
} = require('sequelize');

class ProjectResourceController {

    async fetchAll(req, res, next) {
        try {
            if (!req.user || !req.user.id) {
                return Response.errorUnauthorized()(res);
            }

            const [data, ok] = await projectResourceService.fetchAll()

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

            const projectResourceId = req.params.id;

            if (!projectResourceId) {
                return Response.errorGeneric([], 'Project ID Empty', 'This project Resource ID doesn\'t exist or is invalid!')(res);
            }

            const [data, ok] = await projectResourceService.fetchById(projectResourceId)

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

            const [error , resourceAssignedToProject] = await projectResourceService.resourceAssignedToProject(projectId, req.user.id, isAdmin);

            if (!resourceAssignedToProject) {
                print(`USER ${req.user.id} WANTED TO CREATE NEW PROJECT RESOURCE BUT UNAUTHORIZED`, logType.error);
                return Response.errorGeneric([], 'Not authorized for this project', 'You are not assigned to this project!')(res);
            }

            const projectResourceDetails = req.body
            const resource  = req.user.id

            const [data, ok] = await projectResourceService.create(projectResourceDetails, resource)

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

            const [error , resourceAssignedToProject] = await projectResourceService.resourceAssignedToProject(projectId, req.user.id, isAdmin);

            if (!resourceAssignedToProject) {
                print(`USER ${req.user.id} WANTED TO EDIT PROJECT RESOURCE BUT UNAUTHORIZED`, logType.error);
                return Response.errorGeneric([], 'Not authorized for this project', 'You are not assigned to this project!')(res);
            }

            const projectResourceDetails = req.body
            const projectResourceId = req.params.id
            const resource = req.user.id

            const [data, ok] = await projectResourceService.edit(projectResourceId, projectResourceDetails, resource)

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

            const [error , resourceAssignedToProject] = await projectResourceService.resourceAssignedToProject(projectId, req.user.id, isAdmin);

            if (!resourceAssignedToProject) {
                print(`USER ${req.user.id} WANTED TO DELETE A PROJECT RESOURCE BUT UNAUTHORIZED`, logType.error);
                return Response.errorGeneric([], 'Not authorized for this project', 'You are not assigned to this project!')(res);
            }

            const projectResourceId = req.params.id
            const resource = req.user.id

            const [data, ok] = await projectResourceService.delete(projectResourceId, resource)

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

module.exports = new ProjectResourceController();
