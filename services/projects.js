const { print, logType } = require("../utils");
const db = require("../models");

const {
  ProjectModel,
  ProjectResourceModel,
  ProjectTaskModel,
  ProjectFileModel,
  TaskTemplateModel,
  TaskDependenceModel,
  TaskRelationModel,
} = db;

class ProjectService {
  async fetchAll(isAdmin, resource) {
    try {
      const projects = await ProjectModel.findAll({
        include: [
          {
            model: ProjectResourceModel,
            attributes: [],
            where: isAdmin ? {} : { resource },
          },
          {
            model: ProjectTaskModel,
            attributes: ["id", "title", "desc", "est_start", "est_end", "actual_start", "actual_end", "duration", "critical"],
            include: [
              {
                model: TaskDependenceModel,
                attributes: ["id"],
              },
              {
                model: TaskRelationModel,
                attributes: ["id"],
              },
            ],
          },
          {
            model: ProjectFileModel,
            attributes: ["id", "name", "type"],
          },
        ],
        where:{is_active : true}
      });

      if (!projects || projects.length === 0) {
        print("PROJECTS FETCHED BUT EMPTY", logType.warning);
        return ([], true);
      }

      print("PROJECTS FETCHED", logType.success);
      return (projects, true);
    } catch (error) {
      print(String(error), logType.error);
      return (String(error), false);
    }
  }

  async fetchById(projectId, isAdmin, resource) {

    try {
      const project = await ProjectModel.findOne({
        // where: isAdmin
        //   ? { id: projectId }
        //   : { id: projectId, "$project_resources.resource$": resource },
        include: [
          {
            model: ProjectResourceModel,
            attributes: [],
            where: isAdmin ? {} : { resource },
          },
        //   {
        //     model: DepartmentModel,
        //     attributes: ["name"],
        //   },
          {
            model: ProjectTaskModel,
            attributes: ["id", "title", "desc", "est_start", "est_end", "actual_start", "actual_end", "duration", "critical"],
            include: [
              {
                model: TaskTemplateModel,
                attributes: ["id", "type", "name", "delay"],
              },
              {
                model: TaskDependenceModel,
                attributes: ["id"],
              },
              {
                model: TaskRelationModel,
                attributes: ["id"],
              },
            ],
          },
          {
            model: ProjectFileModel,
            attributes: ["id", "name", "type"],
          },
        ],
        where:{is_active : true}
      });

      if (!project) {
        print("PROJECT FETCHED BUT EMPTY", logType.warning);
        return ([], true);
      }

      print("PROJECT FETCHED", logType.success);
      return (project, true);
    } catch (error) {
      print(String(error), logType.error);
      return (String(error), false);
    }
  }

  async create(projectDetails) {
    const transaction = await db.sequelize.transaction();

    try {
      // Create the main project entry
      const createdProject = await ProjectModel.create(projectDetails, {
        transaction,
      });

      await transaction.commit();

      print(`PROJECT CREATED: ${createdProject.id}`, logType.success);
      return (createdProject, true);
    } catch (error) {
      await transaction.rollback();
      print(String(error), logType.error);
      return (String(error), false);
    }
  }

  async edit(projectId, projectDetails, isAdmin) {
    const transaction = await db.sequelize.transaction();

    try {

      await transaction.commit();

      print(`PROJECT EDITED: ${projectId}`, logType.success);
      return (projectId, true);
    } catch (error) {
      await transaction.rollback();
      print(String(error), logType.error);
      return (String(error), false);
    }
  }

  async delete(projectId, isAdmin) {
    const transaction = await db.sequelize.transaction();

    try {
      // Soft delete the main project entry
      await ProjectModel.update(
        { is_active: false },
        {
          where: { id: projectId },
          transaction,
        }
      );

      // Soft delete associated task entries
      await ProjectTaskModel.update(
        { is_active: false },
        {
          where: { project: projectId },
          transaction,
        }
      );

      // Soft delete associated file entries
      await ProjectFileModel.update(
        { is_active: false },
        {
          where: { project: projectId },
          transaction,
        }
      );

      // Soft delete associated resource assignments
      await ProjectResourceModel.update(
        { is_active: false },
        {
          where: { project: projectId },
          transaction,
        }
      );

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

module.exports = new ProjectService();
