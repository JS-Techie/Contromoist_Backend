const {
  DataTypes
} = require('sequelize');
module.exports = sequelize => {
  const attributes = {
    role_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: false,
      comment: null,
      field: "role_id",
      references: {
        key: "id",
        model: "roles_model"
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
    tableName: "role_user",
    comment: "",
    indexes: [{
      name: "role_user_role_id_foreign",
      unique: false,
      type: "BTREE",
      fields: ["role_id"]
    }]
  };
  const RoleUserModel = sequelize.define("role_user_model", attributes, options);
  return RoleUserModel;
};