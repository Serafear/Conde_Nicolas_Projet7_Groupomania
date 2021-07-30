'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {// up create the table and we change sequelize to DataTypes
    await queryInterface.createTable('users', { //name changed from Users to users, we changed it previously
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        //type: Sequelize.INTEGER  we change all sequelize to Datatypes
        type: DataTypes.INTEGER
      },
      uuid : {  
        type : DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4  
      },
      nom: {
        type: DataTypes.STRING,
        allowNull: false
      },
      prenom: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  down: async (queryInterface, Datatypes) => { //down undo the migration and drop the table and we change sequelize to DataTypes
    await queryInterface.dropTable('users');
  }
};