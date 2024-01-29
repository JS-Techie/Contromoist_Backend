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
    contact_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "contact_id",
      references: {
        key: "id",
        model: "contacts_model"
      }
    },
    user_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
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
    branch_type: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "Main, Branch",
      field: "branch_type"
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
    tableName: "contactbranches",
    comment: "",
    indexes: [{
      name: "contactbranches_contact_id_foreign",
      unique: false,
      type: "BTREE",
      fields: ["contact_id"]
    }, {
      name: "contactbranches_user_id_foreign",
      unique: false,
      type: "BTREE",
      fields: ["user_id"]
    }, {
      name: "contactbranches_country_id_foreign",
      unique: false,
      type: "BTREE",
      fields: ["country_id"]
    }, {
      name: "contactbranches_state_id_foreign",
      unique: false,
      type: "BTREE",
      fields: ["state_id"]
    }, {
      name: "contactbranches_city_id_foreign",
      unique: false,
      type: "BTREE",
      fields: ["city_id"]
    }, {
      name: "contactbranches_district_id_foreign",
      unique: false,
      type: "BTREE",
      fields: ["district_id"]
    }]
  };
  const ContactbranchesModel = sequelize.define("contactbranches_model", attributes, options);
  return ContactbranchesModel;
};