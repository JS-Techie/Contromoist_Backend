const { print, logType } = require("../utils");
const db = require("../models");

const {
    Project,
    ProjectResource,
    Users
} = db;

class ProjectResourceService {

    async fetchAll() {
        try {
            const projectResources = await ProjectResource.findAll({
                include:[
                    {
                        model : Users,
                        attributes : ["name","phone","email_id"],
                        where : {
                                id : db.Sequelize.col('t_project_resource.id')
                        }
                    },
                    {
                        model : Project,
                        attributes : ["name"],
                        where : {
                                id : db.sequelize.col('t_project.id')
                        }
                    }
                ],
                where: { 
                        is_active: true
                    }
            });

            if (!projectResources || projectResources.length === 0) {
                print("PROJECT RESOURCES FETCHED BUT EMPTY", logType.warning);
                return ([], true);
            }

            print("PROJECT RESOURCE FETCHED", logType.success);
            return (projectResources, true);
        } catch (error) {
            print(String(error), logType.error);
            return (String(error), false);
        }
    }

    async fetchById(projectResourceId) {

        try {
            const projectResource = await ProjectResource.findOne({
                include:[
                    {
                        model : Users,
                        attributes : ["name","phone","email_id"],
                        where : {
                                id : db.Sequelize.col('t_project_resource.id')
                        }
                    },
                    {
                        model : Project,
                        attributes : ["name"],
                        where : {
                                id : db.sequelize.col('t_project.id')
                        }
                    }
                ],
                where: { 
                        is_active : true,
                        id : projectResourceId
                    }
            });

            if (!projectResource || projectResource.length === 0) {
                print("PROJECT RESOURCE FETCHED BUT EMPTY", logType.warning);
                return ([], true);
            }

            if (!projectResource) {
                print("PROJECT RESOURCE FETCHED BUT EMPTY", logType.warning);
                return ([], true);
            }

            print("PROJECT RESOURCE FETCHED", logType.success);
            return (projectResource, true);
        } catch (error) {
            print(String(error), logType.error);
            return (String(error), false);
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

            await projectResource.bulkCreate(projectResourceRecords, {
                transaction
            });

            await transaction.commit();

            print(`PROJECT(S) RESOURCE CREATED`, logType.success);
            return (projectResourceRecords, true);
        } catch (error) {
            await transaction.rollback();
            print(String(error), logType.error);
            return (String(error), false);
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
                return ([], false);
            }

            await ProjectResource.update({
                project: projectResourceDetails.project,
                resource: projectResourceDetails.resource,
                allocation: projectResourceDetails.allocation,
                is_pm: projectResourceDetails.is_pm,
                updated_by: resource
            }, {
                where: {
                    id: projectResourceId,
                    fields : ['project','resource','allocation','is_pm','updated_by'],
                    updateOnDuplicate : ['project','resource','allocation','is_pm']
                },
                transaction
            });

            await transaction.commit();

            print(`PROJECT RESOURCE EDITED: ${projectResourceId}`, logType.success);
            return (projectResourceId, true);
        } catch (error) {
            await transaction.rollback();
            print(String(error), logType.error);
            return (String(error), false);
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
                return ([], false);
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

            print(`PROJECT RESOURCE DELETED: ${projectId}`, logType.success);
            return (projectId, true);
        } catch (error) {
            await transaction.rollback();
            print(String(error), logType.error);
            return (String(error), false);
        }
    }
}

module.exports = new ProjectResourceService();
