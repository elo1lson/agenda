"use strict"

const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');

//home routes

route.get('/', homeController.index);

//login routes

route.get('/login/', loginController.index);
route.post('/login/register', loginController.register);

module.exports = route;