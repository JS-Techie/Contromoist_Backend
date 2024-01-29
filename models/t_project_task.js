const {
  DataTypes
} = require('sequelize');
module.exports = sequelize => {
  const attributes = {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "id"
    },
    project: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "project",
      references: {
        key: "id",
        model: "t_project_model"
      }
    },
    task: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "task",
      references: {
        key: "id",
        model: "t_task_model"
      }
    }
  };
  const options = {
    tableName: "t_project_task",
    comment: "",
    indexes: [{
      name: "project",
      unique: false,
      type: "BTREE",
      fields: ["project"]
    }, {
      name: "task",
      unique: false,
      type: "BTREE",
      fields: ["task"]
    }]
  };
  const TProjectTaskModel = sequelize.define("t_project_task_model", attributes, options);
  return TProjectTaskModel;
};