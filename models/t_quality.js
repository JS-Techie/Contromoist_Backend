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
    assigned_to: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "assigned_to",
      references: {
        key: "id",
        model: "users_model"
      }
    },
    task: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "task"
    },
    is_valid: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "is_valid"
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
    }
  };
  const options = {
    tableName: "t_quality",
    comment: "",
    indexes: [{
      name: "project",
      unique: false,
      type: "BTREE",
      fields: ["project"]
    }, {
      name: "assigned_to",
      unique: false,
      type: "BTREE",
      fields: ["assigned_to"]
    }, {
      name: "quality_template_id",
      unique: false,
      type: "BTREE",
      fields: ["quality_template_id"]
    }]
  };
  const TQualityModel = sequelize.define("t_quality_model", attributes, options);
  return TQualityModel;
};