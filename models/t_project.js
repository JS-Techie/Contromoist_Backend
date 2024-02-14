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
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "type",
      references: {
        key: "id",
        model: "t_project_types_model"
      }
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
    },
    created_by: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "created_by",
      references: {
        key: "id",
        model: "users_model"
      }
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.fn('current_timestamp'),
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "created_at"
    },
    updated_by: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "updated_by",
      references: {
        key: "id",
        model: "users_model"
      }
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "updated_at"
    },
    is_active: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: "1",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "is_active"
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
      name: "type",
      unique: false,
      type: "BTREE",
      fields: ["type"]
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
      name: "created_by",
      unique: false,
      type: "BTREE",
      fields: ["created_by"]
    }, {
      name: "updated_by",
      unique: false,
      type: "BTREE",
      fields: ["updated_by"]
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