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
const { log } = require('../../utils/logTypes');


class QualityController {

    async getAllTemplates(req, res, next){
        try{
            if (!req.user || !req.user.id){
                return Response.errorUnauthorized()(res);
            }

            const type = req.query.type == undefined ? null : req.query.type;

            const [data, ok] = await qualityTemplateService.fetchAll(type)

            if(!ok){
                return Response.errorGeneric([], data)(res);
            }

            return Response.successFetch(data)(res);

        }catch(error){
            print(String(error), logType.error)
            return Response.errorGeneric([], error.message)(res)
        }
    }

    async getTemplateById(req, res, next) {
        try {
            if (!req.user || !req.user.id) {
                return Response.errorUnauthorized()(res);
            }

            const templateId = req.params.id;

            if (!templateId) {
                return Response.errorGeneric([], 'Template ID Empty', 'This Template ID doesn\'t exist or is invalid!')(res);
            }

            const [data, ok] = await qualityTemplateService.fetchById(templateId, req.user.id)

            if (!ok) {
                return Response.errorGeneric([], data)(res);
            }

            return Response.successFetch(data)(res);
        } catch (error) {
            print(String(error), logType.error);
            return Response.errorGeneric([], error.message)(res);
        }
    }

    async getAllTasks(req, res, next) {
        try {
            if (!req.user || !req.user.id) {
                return Response.errorUnauthorized()(res);
            }

            const templateId = req.query.templateId

            const [data, ok] = await qualityTemplateService.fetchAllTasks(templateId)

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

            const [data, ok] = await qualityTemplateService.fetchTaskById(taskId)

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

            const {template, tasks} = req.body;

            const [data, ok] = await qualityTemplateService.createTask(template, tasks, req.user.id)

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

    async editTemplate(req, res, next){
        const transaction = await db.sequelize.transaction();

        try {
            if (!req.user || !req.user.id) {
                return Response.errorUnauthorized()(res);
            }

            const templateId = req.params.id;

            if (!templateId) {
                return Response.errorGeneric([], 'Template ID Empty', 'This Template ID doesn\'t exist or is invalid!')(res);
            }

            const template = await qualityTemplateService.fetchById(templateId)
            if (!template) {
                print('TEMPLATE FETCHED BUT EMPTY', logType.warning);
                return Response.errorNotFound()(res);
            }

            const details = req.body

            if (!details || details.length === 0) {
                return Response.errorGeneric([], 'Details array is required and should not be empty', 'Please provide valid details for editing the template task!')(res);
            }

            const [data, ok] = await qualityTemplateService.editTemplate(details, templateId, req.user.id)

            if (!ok) {
                return Response.errorGeneric([], data)(res);
            }

            print(`USER ${req.user.id} EDITED TEMPLATE`, logType.success);

            return Response.editSuccess(data)(res);

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
                return Response.errorGeneric([], 'Task ID Empty', 'This Task ID doesn\'t exist or is invalid!')(res);
            }

            const template_task = await qualityTemplateService.fetchTaskById(taskId)
            if (!template_task) {
                print('TASK FETCHED BUT EMPTY', logType.warning);
                return Response.errorNotFound()(res);
            }

            const details= req.body

            if (!details || details.length === 0) {
                return Response.errorGeneric([], 'Details array is required and should not be empty', 'Please provide valid details for editing the template task!')(res);
            }

            const [data, ok] = await qualityTemplateService.editTask(details, taskId, req.user.id)

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

    async delete(req, res, next) {
        const transaction = await db.sequelize.transaction();

        try {
            const id = req.params.id;
            const is_template = req.query.is_template
            let deleted, ok;
            console.log(is_template);
            if (is_template === true){
                [deleted, ok] = await qualityTemplateService.deleteTemplate(id, req.user.id);
            }
            else{
                [deleted, ok] = await qualityTemplateService.deleteTask(id, req.user.id);
            }
            
            if (!ok) {
                await transaction.rollback();
                return Response.errorGeneric([], deleted)(res);
            }

            await transaction.commit();
            return Response.deleteSuccess(deleted)(res);
        } catch (error) {
            await transaction.rollback();
            return Response.errorGeneric([], error.message)(res);
        }
    }

}

module.exports = new QualityController();
