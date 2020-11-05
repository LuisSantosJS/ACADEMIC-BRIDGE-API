
const express = require('express');
const EmailController = require('./controllers/Emailcontroller');
const UserController = require('./controllers/UserController');
const LeadsController = require('./controllers/LeadsController');

const routes = express.Router();



routes.get('/users/index', UserController.index);
routes.post('/users/create', UserController.create);
// routes.post('/users/validate', UserController.valid);
routes.post('/users/login', UserController.login);

routes.get('/', (req, res) => res.send('VAZA'));

routes.post('/send/email', EmailController.emailSend);
routes.get('/leads/index', LeadsController.index);
routes.post('/leads/create', LeadsController.create);
routes.post('/leads/delete', LeadsController.delete);

module.exports = routes;