const bcrypt = require("bcrypt");


/*  on importe jwt */
const jwt = require("jsonwebtoken");
require('dotenv').config({path : './config.env'});

const {sequelize, User, Post} = require ('../models');  

const { Model } = require("sequelize"); 