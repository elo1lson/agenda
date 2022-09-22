"use strict"

const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const contatoController = require('./src/controllers/contatoController');
const { index, register, login, logout } = require('./src/controllers/loginController');


route.get('/', homeController.index);
route.get('/login/', index);
route.post('/login/register', register);
route.post('/login', login);
route.get('/logout', logout);

route.get('/contatos', contatoController.index);

module.exports = route;