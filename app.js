const express = require('express');
const bodyParser = require('body-parser')
const routs = require('./router/app')

const cors = require('cors')

const app = express();
app.use(bodyParser.json());
app.use(cors())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/', routs);

const server = app.listen(process.env.PORT || 8080);
const io = require('./socket').init(server)
io.on('connection', socket => {
    console.log('Client connected');
});