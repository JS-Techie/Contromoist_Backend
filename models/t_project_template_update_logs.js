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
    project_template_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "project_template_id",
      references: {
        key: "id",
        model: "t_project_template_model"
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
    tableName: "t_project_template_update_logs",
    comment: "",
    indexes: [{
      name: "project_template_id",
      unique: false,
      type: "BTREE",
      fields: ["project_template_id"]
    }]
  };
  const TProjectTemplateUpdateLogsModel = sequelize.define("t_project_template_update_logs_model", attributes, options);
  return TProjectTemplateUpdateLogsModel;
};