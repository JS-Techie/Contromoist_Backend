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
    category_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
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
      allowNull: false,
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
    required_qty: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: "0.00",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "required_qty"
    },
    inventory_qty: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: "0.00",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "inventory_qty"
    },
    rate: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: "0.00",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "rate"
    },
    amount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: "0.00",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "amount"
    },
    status: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: "0",
      primaryKey: false,
      autoIncrement: false,
      comment: "0 => No Rate Contract Raised, 1 => Rate Contract Raised",
      field: "status"
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
    tableName: "bom_items",
    comment: "",
    indexes: [{
      name: "bom_items_bom_id_foreign",
      unique: false,
      type: "BTREE",
      fields: ["bom_id"]
    }, {
      name: "bom_items_item_id_foreign",
      unique: false,
      type: "BTREE",
      fields: ["item_id"]
    }, {
      name: "bom_items_category_id_foreign",
      unique: false,
      type: "BTREE",
      fields: ["category_id"]
    }, {
      name: "bom_items_unit_id_foreign",
      unique: false,
      type: "BTREE",
      fields: ["unit_id"]
    }]
  };
  const BomItemsModel = sequelize.define("bom_items_model", attributes, options);
  return BomItemsModel;
};