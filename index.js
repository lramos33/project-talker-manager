const express = require('express');
const bodyParser = require('body-parser');

const getAllTalkers = require('./middlewares/getAllTalkers');
const getTalkerById = require('./middlewares/getTalkerById');
const validateLogin = require('./middlewares/validateLogin');
const validateToken = require('./middlewares/validateToken');
const validateBodyTalker = require('./middlewares/validateBodyTalker');
const addNewTalker = require('./middlewares/addNewTalker');
const editTalker = require('./middlewares/editTalker');
const deleteTalker = require('./middlewares/deleteTalker');
const searchTalker = require('./middlewares/searchTalker');
const errorMiddleware = require('./middlewares/errorMiddleware');

const app = express();
app.use(bodyParser.json());

const HTTP_OK = 200;
const PORT = '3000';

// <-- REQUISITO 01 -->
app.get('/talker', getAllTalkers);

// <-- REQUISITO 07 -->
app.get('/talker/search', validateToken, searchTalker);

// <-- REQUISITO 02 -->
app.get('/talker/:id', getTalkerById);

// <-- REQUISITO 03 -->
app.post('/login', validateLogin);

// <-- REQUISITO 04 -->
app.post('/talker', validateToken, validateBodyTalker, addNewTalker);

// <-- REQUISITO 05 -->
app.put('/talker/:id', validateToken, validateBodyTalker, editTalker);

// <-- REQUISITO 06 -->
app.delete('/talker/:id', validateToken, deleteTalker);

// Tratamento de erros
app.use(errorMiddleware);

// <-- ENDPOINT AVALIADOR -->
app.get('/', (_request, response) => {
  response.status(HTTP_OK).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
