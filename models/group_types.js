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
    group_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "group_name"
    }
  };
  const options = {
    tableName: "group_types",
    comment: "",
    indexes: []
  };
  const GroupTypesModel = sequelize.define("group_types_model", attributes, options);
  return GroupTypesModel;
};