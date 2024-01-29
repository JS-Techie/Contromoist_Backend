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
    project_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "project_id",
      references: {
        key: "id",
        model: "t_project_model"
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
    tableName: "t_project_update_logs",
    comment: "",
    indexes: [{
      name: "project_id",
      unique: false,
      type: "BTREE",
      fields: ["project_id"]
    }]
  };
  const TProjectUpdateLogsModel = sequelize.define("t_project_update_logs_model", attributes, options);
  return TProjectUpdateLogsModel;
};