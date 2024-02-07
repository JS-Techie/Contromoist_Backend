const {
    Response,
    print,
    logType
} = require('../utils');
const db = require('../models');
const {
    projectService,
    travelService
} = require('../services');
const {
    Sequelize
} = require('sequelize');

class ProjectController {

    async fetchAll(req, res, next) {
        try {
            if (!req.user || !req.user.id) {
                return Response.errorUnauthorized()(res);
            }

            const isAdmin = req.user.isAdmin;

            const [data, ok] = await projectService.fetchAll(req.user.id, isAdmin)

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

            const projectId = req.params.id;

            if (!projectId) {
                return Response.errorGeneric([], 'Project ID Empty', 'This project ID doesn\'t exist or is invalid!')(res);
            }

            const isAdmin = req.user.isAdmin;

            const resourceAssignedToProject = await projectService.resourceAssignedToProject(projectId,req.user.id);

            if (!resourceAssignedToProject) {
                print(`USER ${req.user.id} WANTED TO CREATE NEW REQUISITION BUT UNAUTHORIZED`, logType.error);
                return Response.errorGeneric([], 'Not authorized for this project', 'You are not assigned to this project!')(res);
            }
            const [data, ok] = await projectService.fetchById(projectId, req.user.id, isAdmin)

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
            

            const projectDetails = req.body

            const[data,ok] = await projectService.create(projectDetails)

            if (!ok){
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
            
            const resourceAssignedToProject = await projectService.resourceAssignedToProject(projectId,req.user.id);

            if (!resourceAssignedToProject) {
                print(`USER ${req.user.id} WANTED TO CREATE NEW REQUISITION BUT UNAUTHORIZED`, logType.error);
                return Response.errorGeneric([], 'Not authorized for this project', 'You are not assigned to this project!')(res);
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

            const resourceAssignedToProject = await projectService.resourceAssignedToProject(projectId,req.user.id);

            if (!resourceAssignedToProject) {
                print(`USER ${req.user.id} WANTED TO CREATE NEW REQUISITION BUT UNAUTHORIZED`, logType.error);
                return Response.errorGeneric([], 'Not authorized for this project', 'You are not assigned to this project!')(res);
            }
            
            
        } catch (error) {
            await transaction.rollback();
            print(String(error), logType.error);
            return Response.errorGeneric([], error.message)(res);
        }
    }

}

module.exports = new ProjectController();
