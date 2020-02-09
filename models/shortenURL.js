var Sequelize = require('sequelize');
var sequelize = require('../utils/mysqlClient');

const shortenURL = sequelize.define('shortenURL', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    urlCode: {
        type : Sequelize.STRING,
        allowNull : false,
        unique : true
    },
    originalURL : {
        type : Sequelize.STRING,
        allowNull : false,
        unique : true
    },
    shortURL : {
        type : Sequelize.STRING,
        allowNull : false,
        unique : true
    }
}, { freezeTableName : true , timestamps: true});


(async () => {
    await sequelize.sync();
})();

module.exports = shortenURL;