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
    allocation: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "allocation"
    },
    is_pm: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "is_pm"
    }
  };
  const options = {
    tableName: "t_project_resource",
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
    }]
  };
  const TProjectResourceModel = sequelize.define("t_project_resource_model", attributes, options);
  return TProjectResourceModel;
};