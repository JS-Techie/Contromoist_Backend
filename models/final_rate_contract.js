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
    bom_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "bom_id",
      references: {
        key: "id",
        model: "boms_model"
      }
    },
    rate_contract_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "rate_contract_id",
      references: {
        key: "id",
        model: "rate_contract_master_model"
      }
    },
    lead_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "lead_id",
      references: {
        key: "id",
        model: "leads_model"
      }
    },
    customer_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "customer_id",
      references: {
        key: "id",
        model: "users_model"
      }
    },
    final_rate_contract_code: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "final_rate_contract_code"
    },
    created_by: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "created_by"
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "created_at"
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
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "deleted_at"
    }
  };
  const options = {
    tableName: "final_rate_contract",
    comment: "",
    indexes: [{
      name: "final_rate_contract_bom_id_foreign",
      unique: false,
      type: "BTREE",
      fields: ["bom_id"]
    }, {
      name: "final_rate_contract_rate_contract_id_foreign",
      unique: false,
      type: "BTREE",
      fields: ["rate_contract_id"]
    }, {
      name: "final_rate_contract_lead_id_foreign",
      unique: false,
      type: "BTREE",
      fields: ["lead_id"]
    }, {
      name: "final_rate_contract_customer_id_foreign",
      unique: false,
      type: "BTREE",
      fields: ["customer_id"]
    }]
  };
  const FinalRateContractModel = sequelize.define("final_rate_contract_model", attributes, options);
  return FinalRateContractModel;
};