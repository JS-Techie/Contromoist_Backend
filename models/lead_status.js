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
    status_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "status_name"
    }
  };
  const options = {
    tableName: "lead_status",
    comment: "",
    indexes: []
  };
  const LeadStatusModel = sequelize.define("lead_status_model", attributes, options);
  return LeadStatusModel;
};