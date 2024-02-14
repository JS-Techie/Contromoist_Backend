const {
    print,
    logType
} = require("../../utils");
const db = require("../../models");
const { where } = require("sequelize");

const {
    QualityTemplateTask,
    QualityTemplate
} = db;

class QualityTemplateService {

    async fetchAll(type) {
        try {
            const templates = await QualityTemplate.findAll({
                where:{
                    ...(type ? {type} : {}),
                    is_active: true
                },
            });

            if (!templates || templates.length === 0) {
                print('QUALITY TEMPLATE FETCHED BUT EMPTY', logType.warning);
                return [[], true];
            }

            print('QUALITY TEMPLATE FETCHED', logType.success);
            return [templates, true];

        } catch (error) {
            print(String(error), logType.error);
            return [String(error), false];
        }
    }

    async fetchById(templateId) {
        try {
            const template = await QualityTemplate.findOne({
                where: {id: templateId }
            });

            if (!template) {
                print('TEMPLATE FETCHED BUT EMPTY', logType.warning);
                return [[], true];
            }

            print('TEMPLATE FETCHED', logType.success);
            return [template, true];

        } catch (error) {
            print(String(error), logType.error);
            return [String(error), false];
        }
    }

    async fetchTaskById(taskId) {
        try {
            const task = await QualityTemplateTask.findOne({
                where: {id: taskId }
            });

            if (!task) {
                print('TASK FETCHED BUT EMPTY', logType.warning);
                return [[], true];
            }

            print('TASK FETCHED', logType.success);
            return [task, true];

        } catch (error) {
            print(String(error), logType.error);
            return [String(error), false];
        }
    }

    async fetchAllTasks(template_id){
        try {
            const template_tasks = await QualityTemplateTask.findAll({
                where:{
                    template_id: template_id,
                    is_active: true
                },
            });
            console.log("ghjk", template_tasks)

            if (!template_tasks || template_tasks.length === 0) {
                print('QUALITY TEMPLATE TASKS FETCHED BUT EMPTY', logType.warning);
                return [[], true];
            }

            print('QUALITY TEMPLATE TASKS FETCHED', logType.success);
            return [template_tasks, true];

        } catch (error) {
            print(String(error), logType.error);
            return [String(error), false];
        }
    }

    async createTask(template, tasks, resource) {
        const transaction = await db.sequelize.transaction();

        try {

            let createdTemplate;
            const templateProvided = (template != undefined && Object.keys(template).length) > 0 ? true : false

            if (templateProvided === true){
                createdTemplate = await QualityTemplate.create(
                    {
                        type : template.type,
                        title : template.title,
                        desc : template.desc,
                        created_by : resource
                    },
                    {
                    transaction,
                });
            }

            const TemplateTaskRecords = tasks.map((task) => ({
                template_id : templateProvided === true ? createdTemplate.id : task.template_id,
                task : task.task,
                is_pre : task.is_pre,
                created_by : resource
            }));

            await QualityTemplateTask.bulkCreate(TemplateTaskRecords, {
                transaction
            });

            await transaction.commit();

            print(`USER ${resource} CREATED NEW QUALITY TEMPLATE TASKS`, logType.success);

            return [templateProvided === true ? createdTemplate.id : tasks[0].template_id, true];

        } catch (error) {
            await transaction.rollback();
            print(String(error), logType.error);
            return [String(error), false];
        }
    }

    async editTemplate(details, templateId, resource){
        const transaction = await db.sequelize.transaction();

        try {
            await QualityTemplate.update({
                type : details.type,
                title : details.title,
                desc : details.desc,
                updated_by: resource
            }, {
                where: {
                    id: templateId
                },
                transaction
            });

            await transaction.commit();

            return [templateId, true];

        } catch (error) {
            await transaction.rollback();
            print(String(error), logType.error);
            return [String(error), false];
        }
    }

    async editTask(details, taskId, resource) {
        const transaction = await db.sequelize.transaction();

        try {
            await QualityTemplateTask.update({
                ...(details.template_id !== null && { template_id: details.template_id }),
                task : details.task,
                is_pre : details.is_pre,
                updated_by: resource
            }, {
                where: {
                    id: taskId
                },
                transaction
            });

            await transaction.commit();

            return [taskId, true];

        } catch (error) {
            await transaction.rollback();
            print(String(error), logType.error);
            return [String(error), false];
        }
    }

    async deleteTemplate(templateId, resource){
        const transaction = await db.sequelize.transaction();

        try {
            const updatedTemplate = await QualityTemplate.findOne({
                where: {
                    id: templateId
                },
                transaction
            });

            if (!updatedTemplate) {
                print('QUALITY TEMPLATE NOT FOUND FOR DELETION', logType.warning);
                await transaction.rollback();
                return [[], false];
            }

            await QualityTemplate.update({
                is_active: false,
                updated_by: resource
            }, 
            {
                where: {
                    id: templateId
                },
                transaction
            });

            await QualityTemplateTask.update(
            {
                is_active: false,
                updated_by: resource
            },
            {
                where: {template_id: templateId}
            },
            transaction
            )

            await transaction.commit();

            print(`QUALITY TEMPLATE DELETED: ${templateId}`, logType.success);
            return [updatedTemplate, true];
        } catch (error) {
            await transaction.rollback();
            print(String(error), logType.error);
            return [String(error), false];
        }
    }

    async deleteTask(taskId, resource) {
        const transaction = await db.sequelize.transaction();

        try {

            const updatedTask = await QualityTemplateTask.findOne({
                where: {
                    id: taskId
                },
                transaction,
            });

            if (!updatedTask) {
                print('QUALITY TEMPLATE TASK NOT FOUND FOR DELETION', logType.warning);
                await transaction.rollback();
                return [[], false];
            }

            await QualityTemplateTask.update({
                is_active: false,
                updated_by: resource
            }, {
                where: {
                    id: taskId
                },
                transaction
            });

            await transaction.commit();

            print(`QUALITY TEMPLATE TASK DELETED: ${taskId}`, logType.success);
            return [taskId, true];
        } catch (error) {
            await transaction.rollback();
            print(String(error), logType.error);
            return [String(error), false];
        }
    };
}

module.exports = new QualityTemplateService();
