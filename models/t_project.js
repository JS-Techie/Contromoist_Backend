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
    bom: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "bom",
      references: {
        key: "id",
        model: "boms_model"
      }
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "name"
    },
    type: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "type"
    },
    location: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "location",
      references: {
        key: "id",
        model: "city_model"
      }
    },
    status: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "status",
      references: {
        key: "id",
        model: "t_project_status_model"
      }
    },
    est_start: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "est_start"
    },
    est_end: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "est_end"
    },
    actual_start: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "actual_start"
    },
    actual_end: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "actual_end"
    },
    price_customer: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "price_customer"
    },
    price_actual: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "price_actual"
    },
    kick_off: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "kick_off"
    },
    comment_baseline: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "comment_baseline"
    },
    comment_other: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "comment_other"
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
    quality_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "quality_id",
      references: {
        key: "id",
        model: "t_quality_model"
      }
    }
  };
  const options = {
    tableName: "t_project",
    comment: "",
    indexes: [{
      name: "bom",
      unique: false,
      type: "BTREE",
      fields: ["bom"]
    }, {
      name: "location",
      unique: false,
      type: "BTREE",
      fields: ["location"]
    }, {
      name: "status",
      unique: false,
      type: "BTREE",
      fields: ["status"]
    }, {
      name: "project_template_id",
      unique: false,
      type: "BTREE",
      fields: ["project_template_id"]
    }, {
      name: "quality_id",
      unique: false,
      type: "BTREE",
      fields: ["quality_id"]
    }]
  };
  const TProjectModel = sequelize.define("t_project_model", attributes, options);
  return TProjectModel;
};