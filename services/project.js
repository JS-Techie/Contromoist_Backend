const {
    print,
    logType
} = require("../utils");
const db = require("../models");

const {
    ProjectResource,
    Travel,
    TravelDetails
} = db;

class Project {

    async fetchAll(resource, isAdmin) {
        try {
            const requisitions = await Travel.findAll({
                include: [{
                    model: TravelDetails,
                    where: isAdmin ? {} : {
                        travel_id: db.Sequelize.col('Travel.id')
                    },
                    required: true,
                }],
                where: isAdmin ? {} : {
                    resource
                },
            });

            if (!requisitions || requisitions.length === 0) {
                print('REQUSITIONS FETCHED BUT EMPTY', logType.warning);
                return ([], true);
            }

            print('REQUSITIONS FETCHED', logType.success);
            return (requisitions, true);

        } catch (error) {
            print(String(error), logType.error);
            return (String(error), false);
        }
    }

    async fetchById(requisitionId, resource, isAdmin) {
        try {
            const requisition = await Travel.findOne({
                where: isAdmin ? {
                    id: requisitionId
                } : {
                    id: requisitionId,
                    resource: resource
                },
                include: [{
                    model: TravelDetails,
                    where: {
                        travel_id: db.Sequelize.col('Travel.id')
                    },
                    required: true,
                }],
            });

            if (!requisition) {
                print('REQUISITION FETCHED BUT EMPTY', logType.warning);
                return ([], true);
            }

            print('REQUISITION FETCHED', logType.success);
            return (requisition, true);

        } catch (error) {
            print(String(error), logType.error);
            return (String(error), false);
        }
    }

    async fetchByProjectId(resource, project, isAdmin) {
        try {
            const requisitions = await Travel.findAll({
                where: isAdmin ? {
                    project
                } : {
                    project,
                    resource
                },
                include: [{
                    model: TravelDetails,
                    where: {
                        travel_id: db.Sequelize.col('Travel.id')
                    },
                    required: true,
                }],
            });

            if (!requisitions || requisitions.length === 0) {
                print('REQUISITIONS FETCHED BUT EMPTY BY PROJECT ID', logType.warning);
                return ([], true);
            }
            print('REQUISITIONS FETCHED BY PROJECT ID', logType.success);
            return (requisitions, true);

        } catch (error) {
            print(String(error), logType.error);
            return (String(error), false);
        }
    }

    async createRequisition(project, details, resource) {
        const transaction = await db.sequelize.transaction();

        try {
            const createdTravel = await Travel.create({
                project
            }, {
                transaction
            });

            const travelDetailsRecords = details.map((detail) => ({
                location: detail.location,
                reason: detail.reason,
                amount: detail.amount,
                travel_id: createdTravel.id,
                created_by: resource,
                updated_by: resource,
                is_active: true,
                is_approved: false
            }));

            await TravelDetails.bulkCreate(travelDetailsRecords, {
                transaction
            });

            await transaction.commit();

            print(`USER ${resource} CREATED NEW REQUISITION`, logType.success);

            return (createdTravel, true);

        } catch (error) {
            await transaction.rollback();
            print(String(error), logType.error);
            return (String(error), false);
        }
    }

    async editRequisition(requisitionId, resource, details, project) {
        const transaction = await db.sequelize.transaction();

        try {
            const recordIds = details.map((detail) => detail.id);

            const travelRecords = details.map((detail) => ({
                id: detail.id,
                location: detail.location,
                reason: detail.reason,
                amount: detail.amount,
                project,
                created_by: resource,
                travel_id: requisitionId,
            }));

            await Travel.bulkUpdate(travelRecords, {
                updateOnDuplicate: ['location', 'reason', 'amount']
            });

            await transaction.commit();

            return (recordIds, true);

        } catch (error) {
            print(String(error), logType.error);
            return (String(error), false);
        }
    }

    async deleteRequisition(requisitionId, resource) {
        const transaction = await db.sequelize.transaction();

        try {
            const updatedRequisition = await Travel.findOne({
                where: {
                    id: requisitionId,
                    resource: resource
                },
                include: [{
                    model: TravelDetails,
                    where: {
                        travel_id: db.Sequelize.col('Travel.id')
                    },
                    required: true,
                }],
                transaction,
            });

            if (!updatedRequisition) {
                print('REQUISITION NOT FOUND FOR DELETION', logType.warning);
                await transaction.rollback();
                return ([], false);
            }

            await Travel.update({
                is_active: false
            }, {
                where: {
                    id: requisitionId
                },
                transaction
            });

            await TravelDetails.update({
                is_active: false
            }, {
                where: {
                    travel_id: requisitionId
                },
                transaction
            });

            await transaction.commit();

            print(`REQUISITION DELETED: ${requisitionId}`, logType.success);
            return (updatedRequisition, true);
        } catch (error) {
            await transaction.rollback();
            print(String(error), logType.error);
            return (String(error), false);
        }
    };


    async resourceAssignedToProject(project, resource) {
        try {
            const assigned = await ProjectResource.findOne({
                project,
                resource
            });

            if (!assigned) {
                print(`USER ${resource} IS NOT ASSIGNED TO PROJECT ${project}`, logType.warning);
                return (false, true);
            }
            return (true, true);

        } catch (error) {
            print(String(error), logType.error);
            return (String(error), false);
        }
    }
}

module.exports = new Project();
