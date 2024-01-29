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
    department_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "department_name"
    }
  };
  const options = {
    tableName: "departments",
    comment: "",
    indexes: []
  };
  const DepartmentsModel = sequelize.define("departments_model", attributes, options);
  return DepartmentsModel;
};