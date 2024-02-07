const {
    print,
    logType
} = require("../utils");
const db = require("../models");

const { 
    QualityTemplate,
    Quality
} = db;

class QualityService {

    async fetchAll() {
        try {
            const tasks = await Quality.findAll();

            if (!tasks || tasks.length === 0) {
                print('TASKS FETCHED BUT EMPTY', logType.warning);
                return ([], true);
            }

            print('TASKS FETCHED', logType.success);
            return (tasks, true);

        } catch (error) {
            print(String(error), logType.error);
            return (String(error), false);
        }
    }

    async fetchById(taskId) {
        try {
            const task = await Quality.findOne({
                where: {
                    id: taskId
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

    async fetchByProjectId(project) {
        try {
            const tasks = await Quality.findAll({
                where: {
                    project
                }
            });

            if (!tasks || tasks.length === 0) {
                print('TASKS FETCHED BUT EMPTY BY PROJECT ID', logType.warning);
                return ([], true);
            }
            print('TASKS FETCHED BY PROJECT ID', logType.success);
            return (tasks, true);

        } catch (error) {
            print(String(error), logType.error);
            return (String(error), false);
        }
    }

    async createTask(details, resource) {
        const transaction = await db.sequelize.transaction();

        try {
            const qualityTaskRecords = details.map((detail) => ({
                project: detail.project,
                assigned_to: detail.assigned_to,
                task: detail.task,
                quality_template_id: detail.quality_template_id,
                created_by: resource
            }));

            await Quality.bulkCreate(qualityTaskRecords, {
                transaction
            });

            await transaction.commit();

            print(`USER ${resource} CREATED NEW TASKS`, logType.success);

            return (qualityTaskRecords, true);

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

            const qualityRecords = details.map((detail) => ({
                id: detail.id,
                project: detail.project,
                assigned_to: detail.assigned_to,
                task: detail.task,
                is_valid: detail.is_valid,
                quality_template_id: detail.quality_template_id,
                updated_by: resource
            }));

            await Quality.bulkUpdate(qualityRecords, {
                updateOnDuplicate: ['assigned_to', 'task', 'is_valid']
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
            const updatedTask = await Quality.findOne({
                where: {
                    id: taskId
                },
                transaction,
            });

            if (!updatedTask) {
                print('TASK NOT FOUND FOR DELETION', logType.warning);
                await transaction.rollback();
                return ([], false);
            }

            await Quality.update({
                is_active: false
            }, {
                where: {
                    id: taskId
                },
                transaction
            });

            await transaction.commit();

            print(`TASK DELETED: ${taskId}`, logType.success);
            return (updatedTask, true);
        } catch (error) {
            await transaction.rollback();
            print(String(error), logType.error);
            return (String(error), false);
        }
    };
}
module.exports = new QualityService();
