'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User}) {  //because there is a User model we will not user (models) but ({User})
      // define association here
      //we will have a one to many association
      //by default it will search for the model: User and the primary key: id so UserId
      //but we want to have a userId so....
      this.belongsTo(User, { foreignKey: 'userId'}) //check the Post model
    }
  };
  Post.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      //type: Sequelize.INTEGER  we change all sequelize to Datatypes
      type: DataTypes.INTEGER
    },
    uuid : {   //for best practice : a uuid is a Universally Unique Identifier
      type : DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4  //the v4 is a randomly generated UUID
    },
    body: DataTypes.STRING,
    allowNull:false
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};