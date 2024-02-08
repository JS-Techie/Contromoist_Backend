const { print, logType } = require("../utils");
const db = require("../models");

const {
    ProjectType
} = db;

class ProjectTypeService {

    async fetchAll() {
        try {
            const projectTypes = await ProjectType.findAll({
                where: { 
                        is_active: true,
                    }
            });

            if (!projectTypes || projectTypes.length === 0) {
                print("PROJECT TYPES FETCHED BUT EMPTY", logType.warning);
                return ([], true);
            }

            print("PROJECT TYPES FETCHED", logType.success);
            return (projectTypes, true);
        } catch (error) {
            print(String(error), logType.error);
            return (String(error), false);
        }
    }

    async fetchById(projectTypeId) {

        try {
            const projectType = await ProjectType.findOne({
                where: { 
                            is_active: true,
                            id: projectTypeId
                    }
            });

            if (!projectType) {
                print("PROJECT FETCHED BUT EMPTY", logType.warning);
                return ([], true);
            }

            print("PROJECT FETCHED", logType.success);
            return (projectType, true);
        } catch (error) {
            print(String(error), logType.error);
            return (String(error), false);
        }
    }

    async create(projectTypeDetails) {
        const transaction = await db.sequelize.transaction();

        try {
            // Create the main project entry
            const createdProjectType = await ProjectType.create(projectTypeDetails, {
                transaction,
            });

            await transaction.commit();

            print(`PROJECT TYPE CREATED: ${createdProjectType.id}`, logType.success);
            return (createdProjectType, true);
        } catch (error) {
            await transaction.rollback();
            print(String(error), logType.error);
            return (String(error), false);
        }
    }

    async edit(projectTypeId, projectTypeDetails) {
        const transaction = await db.sequelize.transaction();

        try {

            const projectType = await ProjectType.findOne({
                where: {
                    id: projectTypeId
                },
                transaction,
            });

            if (!projectType) {
                print('PROJECT TYPE NOT FOUND TO UPDATE', logType.warning);
                await transaction.rollback();
                return ([], false);
            }

            await ProjectType.update({
                name : projectTypeDetails.name
            }, {
                where: {
                    id: projectTypeId,
                    fields : ['name'],
                    updateOnDuplicate : ['name']
                },
                transaction
            });

            await transaction.commit();

            print(`PROJECT TYPE EDITED: ${projectTypeId}`, logType.success);
            return (projectTypeId, true);
        } catch (error) {
            await transaction.rollback();
            print(String(error), logType.error);
            return (String(error), false);
        }
    }

    async delete(projectTypeId) {
        const transaction = await db.sequelize.transaction();

        try {

            const projectType = await ProjectType.findOne({
                where: {
                    id: projectTypeId
                },
                transaction,
            });

            if (!projectType) {
                print('PROJECT TYPE NOT FOUND TO DELETE', logType.warning);
                await transaction.rollback();
                return ([], false);
            }

            await ProjectType.update({
                is_active : false
            }, {
                where: {
                    id: projectTypeId
                },
                transaction
            });

            await transaction.commit();

            print(`PROJECT DELETED: ${projectId}`, logType.success);
            return (projectId, true);
        } catch (error) {
            await transaction.rollback();
            print(String(error), logType.error);
            return (String(error), false);
        }
    }
}

module.exports = new ProjectTypeService();
