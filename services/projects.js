const { print, logType } = require("../utils");
const db = require("../models");

const {
  Project,
  ProjectResource,
  ProjectTask,
  ProjectFile,
  TaskTemplate,
  TaskDependence,
  TaskRelation,
} = db;

class ProjectService {
    
  async fetchAll(isAdmin, resource) {
    try {
      const projects = await Project.findAll({
        include: [
          {
            model: ProjectResource,
            attributes: [],
            where: isAdmin ? {} : { resource },
          },
          {
            model: ProjectTask,
            attributes: ["id", "title", "desc", "est_start", "est_end", "actual_start", "actual_end", "duration", "critical"],
            include: [
              {
                model: TaskDependence,
                attributes: ["id"],
              },
              {
                model: TaskRelation,
                attributes: ["id"],
              },
            ],
          },
          {
            model: ProjectFile,
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
      const project = await Project.findOne({
        // where: isAdmin
        //   ? { id: projectId }
        //   : { id: projectId, "$project_resources.resource$": resource },
        include: [
          {
            model: ProjectResource,
            attributes: [],
            where: isAdmin ? {} : { resource },
          },
        //   {
        //     model: Department,
        //     attributes: ["name"],
        //   },
          {
            model: ProjectTask,
            attributes: ["id", "title", "desc", "est_start", "est_end", "actual_start", "actual_end", "duration", "critical"],
            include: [
              {
                model: TaskTemplate,
                attributes: ["id", "type", "name", "delay"],
              },
              {
                model: TaskDependence,
                attributes: ["id"],
              },
              {
                model: TaskRelation,
                attributes: ["id"],
              },
            ],
          },
          {
            model: ProjectFile,
            attributes: ["id", "name", "type"],
          },
        ],
        where:{is_active : true, id : projectId}
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
      const createdProject = await Project.create(projectDetails, {
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
      await Project.update(
        { is_active: false },
        {
          where: { id: projectId },
          transaction,
        }
      );

      // Soft delete associated task entries
      await ProjectTask.update(
        { is_active: false },
        {
          where: { project: projectId },
          transaction,
        }
      );

      // Soft delete associated file entries
      await ProjectFile.update(
        { is_active: false },
        {
          where: { project: projectId },
          transaction,
        }
      );

      // Soft delete associated resource assignments
      await ProjectResource.update(
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

  async resourceAssignedToProject(project, resource, isAdmin) {
    try {

        if (isAdmin){
          return (true, true)
        }

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

module.exports = new ProjectService();
