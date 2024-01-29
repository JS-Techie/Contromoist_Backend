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
    user_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "user_id",
      references: {
        key: "id",
        model: "users_model"
      }
    },
    country_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "country_id",
      references: {
        key: "id",
        model: "country_model"
      }
    },
    state_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "state_id",
      references: {
        key: "id",
        model: "states_model"
      }
    },
    city_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "city_id",
      references: {
        key: "id",
        model: "city_model"
      }
    },
    district_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "district_id",
      references: {
        key: "id",
        model: "district_model"
      }
    },
    group_type_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "group_type_id",
      references: {
        key: "id",
        model: "group_types_model"
      }
    },
    business_type_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "business_type_id",
      references: {
        key: "id",
        model: "business_types_model"
      }
    },
    contact_type: {
      type: DataTypes.ENUM('customer', 'vendor'),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "contact_type"
    },
    contact_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "contact_name"
    },
    contact_phone_no: {
      type: DataTypes.STRING(22),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "contact_phone_no"
    },
    business_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "business_name"
    },
    pan_no: {
      type: DataTypes.STRING(15),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "pan_no"
    },
    gst_number: {
      type: DataTypes.STRING(20),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "gst_number"
    },
    business_address: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "business_address"
    },
    pin_code: {
      type: DataTypes.STRING(15),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "pin_code"
    },
    bank_accname: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "bank_accname"
    },
    bank_accno: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "bank_accno"
    },
    bank_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "bank_name"
    },
    ifsc_code: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "ifsc_code"
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
    tableName: "contacts",
    comment: "",
    indexes: [{
      name: "contacts_user_id_foreign",
      unique: false,
      type: "BTREE",
      fields: ["user_id"]
    }, {
      name: "contacts_country_id_foreign",
      unique: false,
      type: "BTREE",
      fields: ["country_id"]
    }, {
      name: "contacts_state_id_foreign",
      unique: false,
      type: "BTREE",
      fields: ["state_id"]
    }, {
      name: "contacts_city_id_foreign",
      unique: false,
      type: "BTREE",
      fields: ["city_id"]
    }, {
      name: "contacts_district_id_foreign",
      unique: false,
      type: "BTREE",
      fields: ["district_id"]
    }, {
      name: "contacts_group_type_id_foreign",
      unique: false,
      type: "BTREE",
      fields: ["group_type_id"]
    }, {
      name: "contacts_business_type_id_foreign",
      unique: false,
      type: "BTREE",
      fields: ["business_type_id"]
    }]
  };
  const ContactsModel = sequelize.define("contacts_model", attributes, options);
  return ContactsModel;
};