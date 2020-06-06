const express = require('express');
const http = require('http');
const cors = require('cors');
const helmet = require('helmet');
const volleyball = require('volleyball');

require('dotenv').config();

const sockets = require('./sockets');

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 5000;

sockets.init(server);

app.use(express.json());
// app.use(express.urlencoded());
app.use(volleyball);
app.use(helmet());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});