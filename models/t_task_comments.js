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
    task: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "task",
      references: {
        key: "id",
        model: "t_task_model"
      }
    },
    content: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "content"
    }
  };
  const options = {
    tableName: "t_task_comments",
    comment: "",
    indexes: [{
      name: "task",
      unique: false,
      type: "BTREE",
      fields: ["task"]
    }]
  };
  const TTaskCommentsModel = sequelize.define("t_task_comments_model", attributes, options);
  return TTaskCommentsModel;
};