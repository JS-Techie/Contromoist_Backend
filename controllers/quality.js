const {
    Response,
    print,
    logType
} = require('../utils');
const db = require('../models');
const {
    qualityService
} = require('../services');
const {
    Sequelize
} = require('sequelize');
const { log } = require('../utils/logTypes');


class QualityController {

    async getAllTasks(req, res, next) {
        try {
            if (!req.user || !req.user.id) {
                return Response.errorUnauthorized()(res);
            }

            const is_pre = req.query.is_pre == undefined ? null:req.query.is_pre
            const project = req.query.project == undefined ? null:req.query.project

            const [data, ok] = await qualityService.fetchAll(is_pre, project)

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

            const [data, ok] = await qualityService.fetchById(taskId)

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
                quality_template_id,
                project_id
            } = req.body;

            const [data, ok] = await qualityService.createTask(quality_template_id, project_id, req.user.id)

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

    async addTask(req, res, next) {
        const transaction = await db.sequelize.transaction();

        try {
            if (!req.user || !req.user.id) {
                return Response.errorUnauthorized()(res);
            }

            const task_details = req.body;

            const [data, ok] = await qualityService.addTask(task_details, req.user.id)

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

            const details = req.body

            if (!details || details.length === 0) {
                return Response.errorGeneric([], 'Details array is required and should not be empty', 'Please provide valid details for editing the template task!')(res);
            }

            const [data, ok] = await qualityService.editTask(details, req.user.id)

            if (!ok) {
                return Response.errorGeneric([], data)(res);
            }

            print(`USER ${req.user.id} EDITED TASK`, logType.success);

            return Response.editSuccess(data)(res);

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

            const [deletedTask, ok] = await qualityService.deleteTask(taskId, req.user.id);

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
