const express = require('express');
const app = express();

require('dotenv').config();
const mongodb = require('./db');
const router = require('./routes');

const bodyParser = require('body-parser');

const path = require('path');
const http = require('http').createServer(app);
const port = process.env.PORT || 3000;

// Using npm to install bootstrap css, optionally jquery
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.use('/', router);

http.listen(port, () => {
  console.log('listening on *:3000');
})