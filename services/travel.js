const {
    print,
    logType
} = require("../utils");
const db = require("../models");
const {sequelize} = require("../models")
const { query } = require("express");
const t_travel_details = require("../models/t_travel_details");

const {
    ProjectResource,
    Travel,
    TravelDetails
} = db;

class TravelService {

    async fetchAll(resource, isAdmin) {
        try {

            let fetchQuery = `SELECT 
                            t_travel.*,
                            JSON_ARRAYAGG(
                                JSON_OBJECT(
                                    'id', t_travel_details.id,
                                    'location', t_travel_details.location,
                                    'travel_id', t_travel_details.travel_id,
                                    'reason', t_travel_details.reason,
                                    'amount', t_travel_details.amount,
                                    'is_approved', t_travel_details.is_approved,
                                    'approved_by', t_travel_details.approved_by,
                                    'created_by', t_travel_details.created_by,
                                    'created_at', t_travel_details.created_at,
                                    'updated_by', t_travel_details.updated_by,
                                    'updated_at', t_travel_details.updated_at,
                                    'is_active', t_travel_details.is_active
                                )
                            ) AS details
                            FROM 
                            t_travel
                            LEFT JOIN 
                            t_travel_details ON t_travel_details.travel_id = t_travel.id
                            WHERE 
                            t_travel.is_active = TRUE `

            let isAdminJoinQuery= isAdmin ? `` : `AND t_travel.resource = ${resource} `

            let groupByQuery = `GROUP BY t_travel.id`


            fetchQuery = fetchQuery + isAdminJoinQuery + groupByQuery

            let [requisitions,metadata] = await sequelize.query(fetchQuery)


            if (!requisitions || requisitions.length === 0) {
                print('REQUSITIONS FETCHED BUT EMPTY', logType.warning);
                return [[], true];
            }

            const parsed_requistions = requisitions.map((requisition) => ({
                ...requisition, "details": JSON.parse(requisition.details)
            }));

            print('REQUSITIONS FETCHED', logType.success);
            return [parsed_requistions, true];

        } catch (error) {
            print(String(error), logType.error);
            return [String(error), false];
        }
    }

    async fetchById(requisitionId, resource, isAdmin) {
        try {

            let fetchQuery = `SELECT 
                            t_travel.*,
                            JSON_ARRAYAGG(
                                JSON_OBJECT(
                                    'id', t_travel_details.id,
                                    'location', t_travel_details.location,
                                    'travel_id', t_travel_details.travel_id,
                                    'reason', t_travel_details.reason,
                                    'amount', t_travel_details.amount,
                                    'is_approved', t_travel_details.is_approved,
                                    'approved_by', t_travel_details.approved_by,
                                    'created_by', t_travel_details.created_by,
                                    'created_at', t_travel_details.created_at,
                                    'updated_by', t_travel_details.updated_by,
                                    'updated_at', t_travel_details.updated_at,
                                    'is_active', t_travel_details.is_active
                                )
                            ) AS details
                            FROM 
                            t_travel
                            LEFT JOIN 
                            t_travel_details ON t_travel_details.travel_id = t_travel.id
                            WHERE 
                            t_travel.is_active = TRUE AND t_travel.id = ${requisitionId} `

            let isAdminJoinQuery= isAdmin ? `` : `AND t_travel.resource = ${resource} `

            let groupByQuery = `GROUP BY t_travel.id`


            fetchQuery = fetchQuery + isAdminJoinQuery + groupByQuery

            let [requisition,metadata] = await sequelize.query(fetchQuery)

            if (!requisition) {
                print('REQUISITION FETCHED BUT EMPTY', logType.warning);
                return [[], true];
            }

            print('REQUISITION FETCHED', logType.success);

            requisition = {...requisition[0], "details": JSON.parse(requisition[0].details)};
            return [requisition, true];

        } catch (error) {
            print(String(error), logType.error);
            return [String(error), false];
        }
    }

    async fetchByClaimId(claimId){
        try {

            const claim = await TravelDetails.findOne({
                                    where : { id : claimId }
                                })

            if (!claim) {
                print('TRAVEL CLAIM FETCHED BUT EMPTY', logType.warning);
                return [[], true];
            }

            print('TRAVEL CLAIM FETCHED', logType.success);

            return [claim, true];

        } catch (error) {
            print(String(error), logType.error);
            return [String(error), false];
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
                return [[], true];
            }
            print('REQUISITIONS FETCHED BY PROJECT ID', logType.success);
            return [requisitions, true];

        } catch (error) {
            print(String(error), logType.error);
            return [String(error), false];
        }
    }

    async createRequisition(project, requisition, claims, resource) {
        const transaction = await db.sequelize.transaction();

        try {

            let createdTravel;
            let requisitionProvided = (requisition != undefined && Object.keys(requisition).length > 0) ? true : false

            if (requisitionProvided === true){

                createdTravel = await Travel.create({
                    resource:requisition.resource,
                    name:requisition.name,
                    desc:requisition.desc,
                    project: project,
                    created_by: resource
                }, {
                    transaction
                });
            }

            const travelDetailsRecords = claims.map((claim) => ({
                location: claim.location,
                reason: claim.reason,
                amount: claim.amount,
                travel_id: requisitionProvided === true ? createdTravel.id : claim.travel_id,
                created_by: resource,
                is_approved: false
            }));

            await TravelDetails.bulkCreate(travelDetailsRecords, {
                transaction
            });

            await transaction.commit();

            print(`USER ${resource} CREATED NEW REQUISITION`, logType.success);

            return [requisitionProvided === true ? claims[0].travel_id : createdTravel.id, true];

        } catch (error) {
            await transaction.rollback();
            print(String(error), logType.error);
            return [String(error), false];
        }
    }

    async editRequisition(requisitionId, resource, requisition, project) {
        const transaction = await db.sequelize.transaction();

        try {

            await Travel.update({
                resource:requisition.resource,
                name:requisition.name,
                desc:requisition.desc,
                is_approved:requisition.is_approved,
                project: project,
                updated_by: resource
            }, {
                where: {
                    id: requisitionId
                },
                transaction
            });

            await transaction.commit();

            return [requisitionId, true];

        } catch (error) {
            await transaction.rollback();
            print(String(error), logType.error);
            return [String(error), false];
        }
    }

    async editClaim(claimId, resource, claim) {
        const transaction = await db.sequelize.transaction();

        try {

            await TravelDetails.update({
                location: claim.location,
                reason: claim.reason,
                amount: claim.amount,
                updated_by: resource,
                is_approved: false
            }, {
                where: {
                    id: claimId
                },
                transaction
            });

            await transaction.commit();

            return [claimId, true];

        } catch (error) {
            await transaction.rollback();
            print(String(error), logType.error);
            return [String(error), false];
        }
    }

    async deleteRequisition(requisitionId, resource) {
        const transaction = await db.sequelize.transaction();

        try {
            const requisitionForDeletion = await Travel.findOne({
                where: {
                    id: requisitionId
                },
                transaction,
            });

            if (!requisitionForDeletion) {
                print('REQUISITION NOT FOUND FOR DELETION', logType.warning);
                await transaction.rollback();
                return [[], false];
            }

            await Travel.update({
                is_active: false,
                updated_by: resource
            }, {
                where: {
                    id: requisitionId
                },
                transaction
            });

            await TravelDetails.update({
                is_active: false,
                updated_by: resource
            }, {
                where: {
                    travel_id: requisitionId
                },
                transaction
            });

            await transaction.commit();

            print(`REQUISITION DELETED: ${requisitionId}`, logType.success);
            return [requisitionForDeletion, true];
        } catch (error) {
            await transaction.rollback();
            print(String(error), logType.error);
            return [String(error), false];
        }
    };

    async deleteClaim(claimId, resource){
        const transaction = await db.sequelize.transaction();

        try {
            const claimForDeletion = await TravelDetails.findOne({
                where: {
                    id: claimId
                },
                transaction,
            });

            if (!claimForDeletion) {
                print('CLAIM NOT FOUND FOR DELETION', logType.warning);
                await transaction.rollback();
                return [[], false];
            }

            await TravelDetails.update({
                is_active: false,
                updated_by: resource
            }, {
                where: {
                    id: claimId
                },
                transaction
            });

            await transaction.commit();

            print(`CLAIM DELETED: ${claimId}`, logType.success);
            return [claimForDeletion, true];
        } catch (error) {
            await transaction.rollback();
            print(String(error), logType.error);
            return [String(error), false];
        }
    };

}

module.exports = new TravelService();
