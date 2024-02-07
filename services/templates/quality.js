const {
    print,
    logType
} = require("../../utils");
const db = require("../../models");

const {
    QualityTemplate
} = db;

class QualityTemplateService {

    async fetchAll(resource, isAdmin) {
        try {
            const template_tasks = await QualityTemplate.findAll({
                where: isAdmin ? {} : {
                    resource
                },
            });

            if (!template_tasks || template_tasks.length === 0) {
                print('QUALITY TEMPLATE TASKS FETCHED BUT EMPTY', logType.warning);
                return ([], true);
            }

            print('QUALITY TEMPLATE TASKS FETCHED', logType.success);
            return (template_tasks, true);

        } catch (error) {
            print(String(error), logType.error);
            return (String(error), false);
        }
    }

    async fetchById(taskId, resource, isAdmin) {
        try {
            const task = await QualityTemplate.findOne({
                where: isAdmin ? {
                    id: taskId
                } : {
                    id: taskId,
                    resource: resource
                }
            });

            if (!task) {
                print('TASK FETCHED BUT EMPTY', logType.warning);
                return ([], true);
            }

            print('TASK FETCHED', logType.success);
            return (task, true);

        } catch (error) {
            print(String(error), logType.error);
            return (String(error), false);
        }
    }

    async createTask(details, resource) {
        const transaction = await db.sequelize.transaction();

        try {
            const TemplateDetailsRecords = details.map((detail) => ({
                type: detail.type,
                task: detail.task,
                created_by: resource
            }));

            await QualityTemplate.bulkCreate(TemplateDetailsRecords, {
                transaction
            });

            await transaction.commit();

            print(`USER ${resource} CREATED NEW QUALITY TEMPLATE TASK`, logType.success);

            return (createdTemplate, true);

        } catch (error) {
            await transaction.rollback();
            print(String(error), logType.error);
            return (String(error), false);
        }
    }

    async editTask(resource, details) {
        const transaction = await db.sequelize.transaction();

        try {
            const recordIds = details.map((detail) => detail.id);

            const qualityTemplateRecords = details.map((detail) => ({
                id: detail.id,
                type: detail.type,
                task: detail.task,
                updated_by: resource
            }));

            await QualityTemplate.bulkUpdate(qualityTemplateRecords, {
                updateOnDuplicate: ['type', 'task']
            });

            await transaction.commit();

            return (recordIds, true);

        } catch (error) {
            await transaction.rollback();
            print(String(error), logType.error);
            return (String(error), false);
        }
    }

    async deleteTask(taskId) {
        const transaction = await db.sequelize.transaction();

        try {
            const updatedTaskTemplate = await QualityTemplate.findOne({
                where: {
                    id: taskId
                },
                transaction,
            });

            if (!updatedTaskTemplate) {
                print('QUALITY TEMPLATE TASK NOT FOUND FOR DELETION', logType.warning);
                await transaction.rollback();
                return ([], false);
            }

            await QualityTemplate.update({
                is_active: false
            }, {
                where: {
                    id: taskId
                },
                transaction
            });

            await transaction.commit();

            print(`QUALITY TEMPLATE TASK DELETED: ${taskId}`, logType.success);
            return (updatedTaskTemplate, true);
        } catch (error) {
            await transaction.rollback();
            print(String(error), logType.error);
            return (String(error), false);
        }
    };
}

module.exports = new QualityTemplateService();
