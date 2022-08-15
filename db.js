require("dotenv").config();
const Sequelize = require('sequelize');

const env = process.env;

const sequelize = new Sequelize(env.name, env.user, env.password, {dialect:env.dialect});

sequelize.authenticate()
.then(()=>console.log("connected"))
.catch((error)=>console.log(error));

module.exports = sequelize;