const { print, logType } = require("../utils");
const db = require("../models");

const {
    ProjectStatus
} = db;

class ProjectStatusService {

    async fetchAll(type, alertType) {
        try {
            const projectStatuses = await ProjectStatus.findAll({
                where: { 
                        is_active: true,
                        ...(type ? {type} : {}),
                        ...(alertType ? {alert_type : alertType }: {})
                    }
            });

            if (!projectStatuses || projectStatuses.length === 0) {
                print("PROJECT STATUSES FETCHED BUT EMPTY", logType.warning);
                return [[], true];
            }

            print("PROJECT STATUSES FETCHED", logType.success);
            return [projectStatuses, true];
        } catch (error) {
            print(String(error), logType.error);
            return [String(error), false];
        }
    }

    async fetchById(projectStatusId) {

        try {
            const projectStatus = await ProjectStatus.findOne({
                where: { 
                            is_active: true,
                            id: projectStatusId
                    }
            });

            if (!projectStatus) {
                print("PROJECT STATUS FETCHED BUT EMPTY", logType.warning);
                return [[], true];
            }

            print("PROJECT STATUS FETCHED", logType.success);
            return [projectStatus, true];
        } catch (error) {
            print(String(error), logType.error);
            return [String(error), false];
        }
    }

    async create(projectStatusDetails, resource) {
        const transaction = await db.sequelize.transaction();

        try {
            const createdProjectStatus = await ProjectStatus.create({...projectStatusDetails, "created_by": resource}, {
                transaction,
            });

            await transaction.commit();

            print(`PROJECT STATUS CREATED: ${createdProjectStatus.id}`, logType.success);
            return [createdProjectStatus, true];
        } catch (error) {
            await transaction.rollback();
            print(String(error), logType.error);
            return [String(error), false];
        }
    }

    async edit(projectStatusId, projectStatusDetail, resource) {
        const transaction = await db.sequelize.transaction();

        try {

            const projectStatus = await ProjectStatus.findOne({
                where: {
                    id: projectStatusId
                },
                transaction,
            });

            if (!projectStatus) {
                print('PROJECT STATUS NOT FOUND TO UPDATE', logType.warning);
                await transaction.rollback();
                return [[], false];
            }

            await ProjectStatus.update({
                type : projectStatusDetail.type,
                desc : projectStatusDetail.desc,
                alert_type : projectStatusDetail.alert_type,
                updated_by : resource
            }, {
                where: {
                    id: projectStatusId
                },
                transaction
            });

            await transaction.commit();

            print(`PROJECT STATUS EDITED: ${projectStatusId}`, logType.success);
            return [projectStatusId, true];
        } catch (error) {
            await transaction.rollback();
            print(String(error), logType.error);
            return [String(error), false];
        }
    }

    async delete(projectStatusId, resource) {
        const transaction = await db.sequelize.transaction();

        try {

            const projectStatus = await ProjectStatus.findOne({
                where: {
                    id: projectStatusId
                },
                transaction,
            });

            if (!projectStatus) {
                print('PROJECT STATUS NOT FOUND TO DELETE', logType.warning);
                await transaction.rollback();
                return [[], false];
            }

            await ProjectStatus.update({
                is_active : false,
                updated_by : resource
            }, {
                where: {
                    id: projectStatusId
                },
                transaction
            });

            await transaction.commit();

            print(`PROJECT STATUS DELETED: ${projectStatusId}`, logType.success);
            return [projectStatusId, true];
        } catch (error) {
            await transaction.rollback();
            print(String(error), logType.error);
            return [String(error), false];
        }
    }
}

module.exports = new ProjectStatusService();
