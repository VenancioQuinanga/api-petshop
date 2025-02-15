const config = require('./config')
const sequelize = require('sequelize') 

module.exports = app =>{
    const connection = new sequelize(
        config.database, 
        config.username, 
        config.password, 
        config.define 
    );

    try{
        connection.authenticate();
        console.log('Connection with DB done!');

        return connection;
        
    } catch(error){
        console.log('Connection with BD has falid', error.sqlMessage);
    }
}
