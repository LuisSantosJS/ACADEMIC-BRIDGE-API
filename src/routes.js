
const express = require('express');
const EmailController = require('./controllers/Emailcontroller');
const UserController = require('./controllers/UserController');
const LeadsController = require('./controllers/LeadsController');
const OptionsSelectController = require('./controllers/OptionsSelectController');
const routes = express.Router();



routes.get('/users/index', UserController.index);
routes.post('/users/create', UserController.create);
// routes.post('/users/validate', UserController.valid);
routes.post('/users/login', UserController.login);

routes.get('/', (req, res) => res.send('VAZA'));

routes.post('/send/email', EmailController.emailSend);
routes.get('/leads/index', LeadsController.index);
routes.get('/leads/search', LeadsController.indexSearch);
routes.post('/leads/create', LeadsController.create);
routes.post('/leads/delete', LeadsController.delete);


routes.get('/options/group', OptionsSelectController.indexGroup)
routes.get('/options/source', OptionsSelectController.indexSource)



module.exports = routes;