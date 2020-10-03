const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const errHandler = require('./errorHandler.js');

const authRouter = require('../auth/authRouter');
const userRouter = require('../users/userRouter');

const server = express ();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/auth', authRouter);
server.use('/api/users', userRouter);

server.get('/', (req,res) => {
    res.json({api: 'up'})
})

server.use(errHandler);

module.exports = server