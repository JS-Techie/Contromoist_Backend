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
    designation_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "designation_name"
    }
  };
  const options = {
    tableName: "designations",
    comment: "",
    indexes: []
  };
  const DesignationsModel = sequelize.define("designations_model", attributes, options);
  return DesignationsModel;
};