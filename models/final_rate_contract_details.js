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
    final_contract_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "final_contract_id",
      references: {
        key: "id",
        model: "final_rate_contract_model"
      }
    },
    vendor_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "vendor_id",
      references: {
        key: "id",
        model: "users_model"
      }
    },
    quotation_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "quotation_id",
      references: {
        key: "id",
        model: "vendor_quotation_master_model"
      }
    },
    item_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "item_id",
      references: {
        key: "id",
        model: "items_model"
      }
    },
    item_rate: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: "0.00",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "item_rate"
    },
    po_issued: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "po_issued"
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
    tableName: "final_rate_contract_details",
    comment: "",
    indexes: [{
      name: "final_rate_contract_details_final_contract_id_foreign",
      unique: false,
      type: "BTREE",
      fields: ["final_contract_id"]
    }, {
      name: "final_rate_contract_details_vendor_id_foreign",
      unique: false,
      type: "BTREE",
      fields: ["vendor_id"]
    }, {
      name: "final_rate_contract_details_quotation_id_foreign",
      unique: false,
      type: "BTREE",
      fields: ["quotation_id"]
    }, {
      name: "final_rate_contract_details_item_id_foreign",
      unique: false,
      type: "BTREE",
      fields: ["item_id"]
    }]
  };
  const FinalRateContractDetailsModel = sequelize.define("final_rate_contract_details_model", attributes, options);
  return FinalRateContractDetailsModel;
};