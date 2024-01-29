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
    po_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "po_id",
      references: {
        key: "id",
        model: "purchaseorders_model"
      }
    },
    vendorquotation_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "vendorquotation_id",
      references: {
        key: "id",
        model: "vendor_quotation_master_model"
      }
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
    tableName: "purchaseorderquotations",
    comment: "",
    indexes: [{
      name: "purchaseorderquotations_po_id_foreign",
      unique: false,
      type: "BTREE",
      fields: ["po_id"]
    }, {
      name: "purchaseorderquotations_vendorquotation_id_foreign",
      unique: false,
      type: "BTREE",
      fields: ["vendorquotation_id"]
    }]
  };
  const PurchaseorderquotationsModel = sequelize.define("purchaseorderquotations_model", attributes, options);
  return PurchaseorderquotationsModel;
};