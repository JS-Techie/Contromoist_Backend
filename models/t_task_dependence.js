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
    task_x: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "task_x",
      references: {
        key: "id",
        model: "t_task_model"
      }
    },
    task_y: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "task_y",
      references: {
        key: "id",
        model: "t_task_model"
      }
    },
    relation: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "relation",
      references: {
        key: "id",
        model: "t_task_relation_model"
      }
    }
  };
  const options = {
    tableName: "t_task_dependence",
    comment: "",
    indexes: [{
      name: "task_x",
      unique: false,
      type: "BTREE",
      fields: ["task_x"]
    }, {
      name: "task_y",
      unique: false,
      type: "BTREE",
      fields: ["task_y"]
    }, {
      name: "relation",
      unique: false,
      type: "BTREE",
      fields: ["relation"]
    }]
  };
  const TTaskDependenceModel = sequelize.define("t_task_dependence_model", attributes, options);
  return TTaskDependenceModel;
};