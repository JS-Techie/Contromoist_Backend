const { print, logType } = require("../utils");
const db = require("../models");
const {sequelize} = require("../models")

const {
    Project,
    ProjectResource,
    Users
} = db;

class ProjectResourceService {

    async fetchAll() {
        try {
            const [projectResources, metadata] = await sequelize.query(
                                    `SELECT t_project_resource.*, users.name as user_name, users.phone as user_phone, users.email_id as user_email_id, t_project.name as project_name
                                    FROM t_project_resource
                                    LEFT JOIN users ON t_project_resource.resource = users.id
                                    LEFT JOIN t_project ON t_project_resource.project = t_project.id
                                    WHERE t_project_resource.is_active = TRUE;`
                                    )

            if (!projectResources || projectResources.length === 0) {
                print("PROJECT RESOURCES FETCHED BUT EMPTY", logType.warning);
                return [[], true];
            }

            print("PROJECT RESOURCE FETCHED", logType.success);
            return [projectResources, true];
        } catch (error) {
            print(String(error), logType.error);
            return [String(error), false];
        }
    }

    async fetchById(projectResourceId) {

        try {
            const [projectResource, metadata] = await sequelize.query(
                                `SELECT t_project_resource.*, users.name as user_name, users.phone as user_phone, users.email_id as user_email_id, t_project.name as project_name
                                FROM t_project_resource
                                LEFT JOIN users ON t_project_resource.resource = users.id
                                LEFT JOIN t_project ON t_project_resource.project = t_project.id
                                WHERE t_project_resource.id = ${projectResourceId};`
                                )

            if (!projectResource || projectResource.length === 0) {
                print("PROJECT RESOURCE FETCHED BUT EMPTY", logType.warning);
                return [[], true];
            }

            if (!projectResource) {
                print("PROJECT RESOURCE FETCHED BUT EMPTY", logType.warning);
                return [[], true];
            }

            print("PROJECT RESOURCE FETCHED", logType.success);
            return [projectResource[0], true];
        } catch (error) {
            print(String(error), logType.error);
            return [String(error), false];
        }
    }

    async create(projectResourceDetails, resource) {
        const transaction = await db.sequelize.transaction();

        try {

            const projectResourceRecords = projectResourceDetails.map((detail) => ({
                project: detail.project,
                resource: detail.resource,
                allocation: detail.allocation,
                is_pm: detail.is_pm,
                created_by: resource
            }));

            console.log("THE REcoRDS ::", projectResourceRecords)

            await ProjectResource.bulkCreate(projectResourceRecords, {
                transaction
            });

            await transaction.commit();

            print(`PROJECT(S) RESOURCE CREATED`, logType.success);
            return [projectResourceRecords, true];
        } catch (error) {
            await transaction.rollback();
            print(String(error), logType.error);
            return [String(error), false];
        }
    }

    async edit(projectResourceId, projectResourceDetails, resource) {
        const transaction = await db.sequelize.transaction();

        try {

            const projectResource = await ProjectResource.findOne({
                where: {
                    id: projectResourceId
                },
                transaction,
            });

            if (!projectResource) {
                print('PROJECT RESOURCE NOT FOUND TO UPDATE', logType.warning);
                await transaction.rollback();
                return [[], false];
            }

            await ProjectResource.update({
                resource: projectResourceDetails.resource,
                allocation: projectResourceDetails.allocation,
                is_pm: projectResourceDetails.is_pm,
                updated_by: resource
            }, {
                where: {
                    id: projectResourceId
                },
                transaction
            });

            await transaction.commit();

            print(`PROJECT RESOURCE EDITED: ${projectResourceId}`, logType.success);
            return [projectResourceId, true];
        } catch (error) {
            await transaction.rollback();
            print(String(error), logType.error);
            return [String(error), false];
        }
    }

    async delete(projectResourceId, resource) {
        const transaction = await db.sequelize.transaction();

        try {

            const projectResource = await ProjectResource.findOne({
                where: {
                    id: projectResourceId
                },
                transaction,
            });

            if (!projectResource) {
                print('PROJECT RESOURCE NOT FOUND TO DELETE', logType.warning);
                await transaction.rollback();
                return [[], false];
            }

            await ProjectResource.update({
                is_active : false,
                updated_by : resource
            }, {
                where: {
                    id: projectResourceId
                },
                transaction
            });

            await transaction.commit();

            print(`PROJECT RESOURCE DELETED: ${projectResourceId}`, logType.success);
            return [projectResourceId, true];
        } catch (error) {
            await transaction.rollback();
            print(String(error), logType.error);
            return [String(error), false];
        }
    }
}

module.exports = new ProjectResourceService();
