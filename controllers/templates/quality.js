const {
    Response,
    print,
    logType
} = require('../../utils');
const db = require('../../models');
const {
    qualityTemplateService
} = require('../../services');
const {
    Sequelize
} = require('sequelize');


class QualityController {

    async getAllTasks(req, res, next) {
        try {
            if (!req.user || !req.user.id) {
                return Response.errorUnauthorized()(res);
            }

            const isAdmin = req.user.isAdmin;

            const [data, ok] = await qualityTemplateService.fetchAll(req.user.id, isAdmin)

            if (!ok) {
                return Response.errorGeneric([], data)(res);
            }

            return Response.successFetch(data)(res);

        } catch (error) {
            print(String(error), logType.error);
            return Response.errorGeneric([], error.message)(res);
        }
    }

    async getTaskById(req, res, next) {
        try {
            if (!req.user || !req.user.id) {
                return Response.errorUnauthorized()(res);
            }

            const taskId = req.params.id;

            if (!taskId) {
                return Response.errorGeneric([], 'Task ID Empty', 'This Template Task ID doesn\'t exist or is invalid!')(res);
            }

            const isAdmin = req.user.isAdmin;

            const [data, ok] = await qualityTemplateService.fetchById(taskId, req.user.id, isAdmin)

            if (!ok) {
                return Response.errorGeneric([], data)(res);
            }

            return Response.successFetch(data)(res);
        } catch (error) {
            print(String(error), logType.error);
            return Response.errorGeneric([], error.message)(res);
        }
    }

    async createTask(req, res, next) {
        const transaction = await db.sequelize.transaction();

        try {
            if (!req.user || !req.user.id) {
                return Response.errorUnauthorized()(res);
            }

            const {
                details
            } = req.body;

            const [data, ok] = await qualityTemplateService.createTask(details, req.user.id)

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

    async editTask(req, res, next) {
        const transaction = await db.sequelize.transaction();

        try {
            if (!req.user || !req.user.id) {
                return Response.errorUnauthorized()(res);
            }

            const taskId = req.params.id;

            if (!taskId) {
                return Response.errorGeneric([], 'Task ID Empty', 'This requisition ID doesn\'t exist or is invalid!')(res);
            }

            const template_task = await qualityTemplateService.fetchById(taskId, req.user.id, req.user.isAdmin)
            if (!template_task) {
                print('TASK FETCHED BUT EMPTY', logType.warning);
                return Response.errorNotFound()(res);
            }

            const {
                details
            } = req.body

            if (!details || details.length === 0) {
                return Response.errorGeneric([], 'Details array is required and should not be empty', 'Please provide valid details for editing the template task!')(res);
            }

            const [data, ok] = await qualityTemplateService.editTask(req.user.id, details)

            if (!ok) {
                return Response.errorGeneric([], data)(res);
            }

            print(`USER ${req.user.id} EDITED TASK`, logType.success);

            return Response.successUpdate(data)(res);

        } catch (error) {
            await transaction.rollback();
            print(String(error), logType.error);
            return Response.errorGeneric([], error.message)(res);
        }
    }

    async deleteTask(req, res, next) {
        const transaction = await db.sequelize.transaction();

        try {
            const taskId = req.params.id;

            const [deletedTask, ok] = await qualityTemplateService.deleteTask(taskId);

            if (!ok) {
                await transaction.rollback();
                return Response.errorGeneric([], deletedTask)(res);
            }

            await transaction.commit();
            return Response.deleteSuccess(deletedTask)(res);
        } catch (error) {
            await transaction.rollback();
            return Response.errorGeneric([], error.message)(res);
        }
    }

}

module.exports = new QualityController();
