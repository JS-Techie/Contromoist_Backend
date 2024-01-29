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
    task_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "task_id",
      references: {
        key: "id",
        model: "t_task_model"
      }
    },
    field: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "field"
    },
    value: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "value"
    }
  };
  const options = {
    tableName: "t_task_update_logs",
    comment: "",
    indexes: [{
      name: "task_id",
      unique: false,
      type: "BTREE",
      fields: ["task_id"]
    }]
  };
  const TTaskUpdateLogsModel = sequelize.define("t_task_update_logs_model", attributes, options);
  return TTaskUpdateLogsModel;
};