const {
    Response,
    print,
    logType
} = require('../utils');
const db = require('../models');
const {
    projectService
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

            // Implement the logic to fetch a project by ID using projectService
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
        // Implement the logic to create a new project similar to createRequisition in TravelController
    }

    async edit(req, res, next) {
        // Implement the logic to edit a project similar to editRequisition in TravelController
    }

    async delete(req, res, next) {
        // Implement the logic to delete a project similar to deleteRequisition in TravelController
    }
}

module.exports = new ProjectController();
