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
    quality_template_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "quality_template_id",
      references: {
        key: "id",
        model: "t_quality_template_model"
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
    tableName: "t_quality_template_update_logs",
    comment: "",
    indexes: [{
      name: "quality_template_id",
      unique: false,
      type: "BTREE",
      fields: ["quality_template_id"]
    }]
  };
  const TQualityTemplateUpdateLogsModel = sequelize.define("t_quality_template_update_logs_model", attributes, options);
  return TQualityTemplateUpdateLogsModel;
};