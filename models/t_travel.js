const {
  DataTypes
} = require('sequelize');
module.exports = (sequelize,DataTypes) => {
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
    resource: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "resource",
      references: {
        key: "id",
        model: "users_model"
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
    reason: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "reason"
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "amount"
    },
    is_approved: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "is_approved"
    },
    approved_by: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "approved_by",
      references: {
        key: "id",
        model: "users_model"
      }
    }
  };
  const options = {
    tableName: "t_travel",
    comment: "",
    indexes: [{
      name: "project",
      unique: false,
      type: "BTREE",
      fields: ["project"]
    }, {
      name: "resource",
      unique: false,
      type: "BTREE",
      fields: ["resource"]
    }, {
      name: "location",
      unique: false,
      type: "BTREE",
      fields: ["location"]
    }, {
      name: "approved_by",
      unique: false,
      type: "BTREE",
      fields: ["approved_by"]
    }]
  };
  const TTravelModel = sequelize.define("t_travel_model", attributes, options);
  return TTravelModel;
};