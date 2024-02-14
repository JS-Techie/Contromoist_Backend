const {
    print,
    logType
} = require("../utils");
const db = require("../models");
const {sequelize} = require('../models')

const {
    QualityTemplateTask,
    QualityTemplate,
    Quality
} = db;

class QualityService {

    async fetchAll(is_pre, project) {
        try {

            const tasks = await Quality.findAll({
                where: {
                        ...(is_pre ? { is_pre } : {}),
                        ...(project ? { project }: {}),
                        is_active: true
                }
            }
            );

            if (!tasks || tasks.length === 0) {
                print('TASKS FETCHED BUT EMPTY', logType.warning);
                return [[], true];
            }

            print('TASKS FETCHED', logType.success);
            return [tasks, true];

        } catch (error) {
            print(String(error), logType.error);
            return [String(error), false];
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
                return [[], true];
            }

            print('TASK FETCHED', logType.success);
            return [task, true];

        } catch (error) {
            print(String(error), logType.error);
            return [String(error), false];
        }
    }

    async createTask(qualityTemplateId, project_id, resource) {
        const transaction = await db.sequelize.transaction();

        try {

            const templateDatas = await QualityTemplateTask.findAll({
                where:{
                    template_id: qualityTemplateId,
                    is_active: true
                }
            })

            const qualityTaskRecords = templateDatas.map((detail) => ({
                    project: project_id,
                    task: detail.task,
                    is_pre: detail.is_pre,
                    quality_template_id: qualityTemplateId,
                    is_valid: false,
                    created_by: resource
                }));

            await Quality.bulkCreate(qualityTaskRecords, {
                transaction
            });

            await transaction.commit();

            print(`USER ${resource} CREATED NEW TASKS`, logType.success);

            return [qualityTaskRecords, true];

        } catch (error) {
            await transaction.rollback();
            print(String(error), logType.error);
            return [String(error), false];
        }
    }

    async addTask(task_details, resource) {
        const transaction = await db.sequelize.transaction();

        try {

            const created_task = await Quality.create({
                project : task_details.project,
                assigned_to: task_details.assigned_to != undefined ? task_details.assigned_to : null,
                task : task_details.task,
                is_valid : false,
                is_pre : task_details.is_pre,
                created_by : resource
            },{
                transaction
            })

            await transaction.commit();

            print(`USER ${resource} ADDED NEW TASKS`, logType.success);

            return [created_task.id, true];

        } catch (error) {
            await transaction.rollback();
            print(String(error), logType.error);
            return [String(error), false];
        }
    }

    async editTask(details, resource) {
        const transaction = await db.sequelize.transaction();

        try {
            const recordIds = details.map((detail) => detail.id);

            const qualityRecords = details.map((detail) => ({
                id: detail.id,
                assigned_to: detail.assigned_to,
                task: detail.task,
                is_valid: detail.is_valid,
                is_pre: detail.is_pre,
                updated_by: resource
            }));

            await Quality.bulkCreate(qualityRecords, {
                updateOnDuplicate: ['id','assigned_to', 'task', 'is_valid','is_pre','updated_by']
            });

            await transaction.commit();

            return [recordIds, true];

        } catch (error) {
            await transaction.rollback();
            print(String(error), logType.error);
            return [String(error), false];
        }
    }

    async deleteTask(taskId, resource) {
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
                return [[], false];
            }

            await Quality.update({
                is_active: false,
                updated_by: resource
            }, {
                where: {
                    id: taskId
                },
                transaction
            });

            await transaction.commit();

            print(`TASK DELETED: ${taskId}`, logType.success);
            return [updatedTask, true];
        } catch (error) {
            await transaction.rollback();
            print(String(error), logType.error);
            return [String(error), false];
        }
    };
}
module.exports = new QualityService();
