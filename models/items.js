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
    material_type_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "material_type_id",
      references: {
        key: "id",
        model: "material_types_model"
      }
    },
    brand_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "brand_id",
      references: {
        key: "id",
        model: "brands_model"
      }
    },
    category_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "category_id",
      references: {
        key: "id",
        model: "categories_model"
      }
    },
    unit_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "unit_id",
      references: {
        key: "id",
        model: "units_model"
      }
    },
    warehouse_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "warehouse_id",
      references: {
        key: "id",
        model: "warehouses_model"
      }
    },
    ledger_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "ledger_id",
      references: {
        key: "id",
        model: "ledgers_model"
      }
    },
    parent_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: "0",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "parent_id"
    },
    item_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "item_name"
    },
    item_code: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "item_code"
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "description"
    },
    hsn_code: {
      type: DataTypes.STRING(150),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "hsn_code"
    },
    gst_rate: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: "0.00",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "gst_rate"
    },
    part_no: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "part_no"
    },
    base_price: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: "0.00",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "base_price"
    },
    opening_qty: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: "0.00",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "opening_qty"
    },
    opening_date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "opening_date"
    },
    closing_qty: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: "0.00",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "closing_qty"
    },
    charge: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: "0.00",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "charge"
    },
    ledger_percent_amount: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: "0.00",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "ledger_percent_amount"
    },
    is_primary: {
      type: DataTypes.ENUM('0', '1'),
      allowNull: false,
      defaultValue: "0",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "is_primary"
    },
    supply_rate: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: "0.00",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "supply_rate"
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
    tableName: "items",
    comment: "",
    indexes: [{
      name: "items_material_type_id_foreign",
      unique: false,
      type: "BTREE",
      fields: ["material_type_id"]
    }, {
      name: "items_brand_id_foreign",
      unique: false,
      type: "BTREE",
      fields: ["brand_id"]
    }, {
      name: "items_category_id_foreign",
      unique: false,
      type: "BTREE",
      fields: ["category_id"]
    }, {
      name: "items_unit_id_foreign",
      unique: false,
      type: "BTREE",
      fields: ["unit_id"]
    }, {
      name: "items_warehouse_id_foreign",
      unique: false,
      type: "BTREE",
      fields: ["warehouse_id"]
    }, {
      name: "items_ledger_id_foreign",
      unique: false,
      type: "BTREE",
      fields: ["ledger_id"]
    }]
  };
  const ItemsModel = sequelize.define("items_model", attributes, options);
  return ItemsModel;
};