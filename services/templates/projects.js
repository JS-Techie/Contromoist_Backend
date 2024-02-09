const { print, logType } = require("../utils");
const db = require("../../models");

const {
    ProjectTemplate
} = db;

class ProjectTemplateService {

    async fetchAll(type) {
        try {
            const ProjectTemplates = await ProjectTemplate.findAll({
                where: { 
                        is_active: true,
                        ...(type ? {type} : {})
                    }
            });

            if (!ProjectTemplates || ProjectTemplates.length === 0) {
                print("PROJECT TEMPLATES FETCHED BUT EMPTY", logType.warning);
                return ([], true);
            }

            print("PROJECT TEMPLATES FETCHED", logType.success);
            return (ProjectTemplates, true);
        } catch (error) {
            print(String(error), logType.error);
            return (String(error), false);
        }
    }

    async fetchById(projectTemplateId) {

        try {
            const projectTemplate = await ProjectTemplate.findOne({
                where: { 
                            is_active: true,
                            id: projectTemplateId
                    }
            });

            if (!projectTemplate) {
                print("PROJECT TEMPLATE FETCHED BUT EMPTY", logType.warning);
                return ([], true);
            }

            print("PROJECT TEMPLATE FETCHED", logType.success);
            return (projectTemplate, true);
        } catch (error) {
            print(String(error), logType.error);
            return (String(error), false);
        }
    }

    async create(projectTemplateDetails, resource) {
        const transaction = await db.sequelize.transaction();

        try {
            const createdProjectTemplate = await ProjectTemplate.create({...projectTemplateDetails, "created_by": resource}, {
                transaction,
            });

            await transaction.commit();

            print(`PROJECT TEMPLATE CREATED: ${createdProjectTemplate.id}`, logType.success);
            return (createdProjectTemplate, true);
        } catch (error) {
            await transaction.rollback();
            print(String(error), logType.error);
            return (String(error), false);
        }
    }

    async edit(projectTemplateId, projectTemplateDetail, resource) {
        const transaction = await db.sequelize.transaction();

        try {

            const projectTemplate = await ProjectTemplate.findOne({
                where: {
                    id: projectTemplateId
                },
                transaction,
            });

            if (!projectTemplate) {
                print('PROJECT TEMPLATE NOT FOUND TO UPDATE', logType.warning);
                await transaction.rollback();
                return ([], false);
            }

            await ProjectTemplate.update({
                name : projectTemplateDetail.name,
                type : projectTemplateDetail.type,
                updated_by : resource
            }, {
                where: {
                    id: projectTemplateId,
                    fields : ['name', 'type', 'updated_by'],
                    updateOnDuplicate : ['name', 'type']
                },
                transaction
            });

            await transaction.commit();

            print(`PROJECT TEMPLATE EDITED: ${projectTemplateId}`, logType.success);
            return (projectTemplateId, true);
        } catch (error) {
            await transaction.rollback();
            print(String(error), logType.error);
            return (String(error), false);
        }
    }

    async delete(projectTemplateId, resource) {
        const transaction = await db.sequelize.transaction();

        try {

            const projectTemplate = await ProjectTemplate.findOne({
                where: {
                    id: projectTemplateId
                },
                transaction,
            });

            if (!projectTemplate) {
                print('PROJECT TEMPLATE NOT FOUND TO DELETE', logType.warning);
                await transaction.rollback();
                return ([], false);
            }

            await ProjectTemplate.update({
                is_active : false,
                updated_by : resource
            }, {
                where: {
                    id: projectTemplateId
                },
                transaction
            });

            await transaction.commit();

            print(`PROJECT TEMPLATE DELETED: ${projectTemplate.id}`, logType.success);
            return (projectTemplate.id, true);
        } catch (error) {
            await transaction.rollback();
            print(String(error), logType.error);
            return (String(error), false);
        }
    }
}

module.exports = new ProjectTemplateService();
