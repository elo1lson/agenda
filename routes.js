"use strict"

const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const contatoController = require('./src/controllers/contatoController');
const { index, register, login, logout } = require('./src/controllers/loginController');
const { loginRequired } = require('./src/middlewares/middleware')

route.get('/', homeController.index);
route.get('/login/', index);
route.post('/login/register', register);
route.post('/login', login);
route.get('/logout', logout);

route.get('/contatos', loginRequired, contatoController.index);
route.post('/contatos', loginRequired, contatoController.register);
route.get('/contatos/:id', loginRequired, contatoController.edit);
route.get('/contatos/:id/delete', loginRequired, contatoController.delete);
route.post('/contatos/:id', loginRequired, contatoController.update);

module.exports = route;