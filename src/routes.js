const { Router } = require('express');
const express = require('express');
const EmailController = require('./controllers/Emailcontroller');
const UserController = require('./controllers/UserController');

const routes = express.Router();



routes.get('/users/index', UserController.index);
routes.post('/users/create', UserController.create);
// routes.post('/users/validate', UserController.valid);
routes.post('/users/login', UserController.login);

routes.get('/', (req, res) => res.send('VAZA'));

routes.post('/send/email', EmailController.emailSend);

module.exports = routes;