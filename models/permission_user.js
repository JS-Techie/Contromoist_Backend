const {
  DataTypes
} = require('sequelize');
module.exports = sequelize => {
  const attributes = {
    permission_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: false,
      comment: null,
      field: "permission_id",
      references: {
        key: "id",
        model: "permissions_model"
      }
    },
    user_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: false,
      comment: null,
      field: "user_id"
    },
    user_type: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: false,
      comment: null,
      field: "user_type"
    }
  };
  const options = {
    tableName: "permission_user",
    comment: "",
    indexes: [{
      name: "permission_user_permission_id_foreign",
      unique: false,
      type: "BTREE",
      fields: ["permission_id"]
    }]
  };
  const PermissionUserModel = sequelize.define("permission_user_model", attributes, options);
  return PermissionUserModel;
};