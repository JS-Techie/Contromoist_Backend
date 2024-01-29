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
    item_category_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "item_category_id"
    },
    item_unit_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "item_unit_id"
    },
    item_hsn: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "item_hsn"
    },
    item_qty: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: "0.00",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "item_qty"
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
    item_amount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: "0.00",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "item_amount"
    },
    item_gst_rate: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: "0.00",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "item_gst_rate"
    },
    item_cgst_amount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: "0.00",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "item_cgst_amount"
    },
    item_sgst_amount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: "0.00",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "item_sgst_amount"
    },
    Item_igst_amount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: "0.00",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "Item_igst_amount"
    },
    item_total_amount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: "0.00",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "item_total_amount"
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
    tableName: "vendor_quotation_details",
    comment: "",
    indexes: [{
      name: "vendor_quotation_details_quotation_id_foreign",
      unique: false,
      type: "BTREE",
      fields: ["quotation_id"]
    }, {
      name: "vendor_quotation_details_item_id_foreign",
      unique: false,
      type: "BTREE",
      fields: ["item_id"]
    }]
  };
  const VendorQuotationDetailsModel = sequelize.define("vendor_quotation_details_model", attributes, options);
  return VendorQuotationDetailsModel;
};