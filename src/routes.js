
const express = require('express');
const EmailController = require('./controllers/Emailcontroller');
const UserController = require('./controllers/UserController');
const LeadsController = require('./controllers/LeadsController');
const SourceController = require('./controllers/SourceController');
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
routes.post('/leads/update', LeadsController.update);
routes.post('/leads/delete', LeadsController.delete);


// routes.get('/options/group', OptionsSelectController.indexGroup)
// routes.post('/options/group/create', OptionsSelectController.createGroup)
// routes.post('/options/group/delete', OptionsSelectController.deleteGroup)



routes.get('/options/source', SourceController.indexSource)
routes.post('/options/source/create', SourceController.createSource)
routes.post('/options/source/delete', SourceController.deleteSource)



module.exports = routes;