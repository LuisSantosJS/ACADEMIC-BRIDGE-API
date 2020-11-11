const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const http = require('http');
const IO = require('socket.io');

const port = process.env.PORT || 3333;

const app = express();
app.use(cors());
app.use(express.json());
const server = http.createServer(app)
const io = IO.listen(server);

io.on("connection", socket => {

});
app.io = io;
app.use((req, res, next) => {
	//Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
	//Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    next();
});
app.use(routes);
app.use(function (req, res, next) {
    req.io = io;
    next();
});
server.listen(port, () => console.log('server running: ', port)); 