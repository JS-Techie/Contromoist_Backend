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
    business_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "business_name"
    }
  };
  const options = {
    tableName: "business_types",
    comment: "",
    indexes: []
  };
  const BusinessTypesModel = sequelize.define("business_types_model", attributes, options);
  return BusinessTypesModel;
};