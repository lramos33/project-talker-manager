const express = require('express');
const bodyParser = require('body-parser');

const getAllTalkers = require('./middlewares/getAllTalkers');
const getTalkerById = require('./middlewares/getTalkerById');
const validateLogin = require('./middlewares/validateLogin');
const validateToken = require('./middlewares/validateToken');
const validateBodyTalker = require('./middlewares/validateBodyTalker');
const addNewTalker = require('./middlewares/addNewTalker');
const errorMiddleware = require('./middlewares/errorMiddleware');

const app = express();
app.use(bodyParser.json());

const HTTP_OK = 200;
const PORT = '3000';

// <-- REQUISITO 01 -->
app.get('/talker', getAllTalkers);

// <-- REQUISITO 02 -->
app.get('/talker/:id', getTalkerById);

// <-- REQUISITO 03 -->
app.post('/login', validateLogin);

// <-- REQUISITO 04 -->
app.post('/talker', validateToken, validateBodyTalker, addNewTalker);

// Tratamento de erros
app.use(errorMiddleware);

// <-- ENDPOINT AVALIADOR -->
app.get('/', (_request, response) => {
  response.status(HTTP_OK).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
