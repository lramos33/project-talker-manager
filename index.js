const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs/promises');

const app = express();
app.use(bodyParser.json());

const HTTP_OK = 200;
const HTTP_BAD_REQUEST = 400;
const HTTP_NOT_FOUND = 404;
const PORT = '3000';
const TALKERS_FILE = './talker.json';
const E_REGEX = /(.+)@(.+){2,}\.(.+){2,}/;

// <-- REQUISITO 01 -->
app.get('/talker', async (_req, res, _next) => {
  const talkersList = JSON.parse(await fs.readFile(TALKERS_FILE));

  if (talkersList.length === 0) {
    return res.status(HTTP_OK).send([]);
  }

  res.status(HTTP_OK).json(talkersList);
});

// <-- REQUISITO 02 -->
app.get('/talker/:id', async (req, res, _next) => {
  const { id } = req.params;
  const talkersList = JSON.parse(await fs.readFile(TALKERS_FILE));
  const talker = talkersList.find((t) => t.id === parseInt(id, 10));

  if (!talker) {
    res.status(HTTP_NOT_FOUND).json({ message: 'Pessoa palestrante não encontrada' });
  }

  res.status(HTTP_OK).json(talker);
});

// <-- REQUISITO 03 -->
const validateEmail = (email) => {
  if (!email || email === '') return { message: 'O campo "email" é obrigatório' };
  if (!email.match(E_REGEX)) return { message: 'O "email" deve ter o formato "email@email.com"' };
};

const validatePassword = (password) => {
  if (!password || password === '') return { message: 'O campo "password" é obrigatório' };
  if (password.length < 6) return { message: 'O "password" deve ter pelo menos 6 caracteres' };
};

app.post('/login', (req, res, _next) => {
  const { email, password } = req.body;
  const emailError = validateEmail(email);
  const passwordError = validatePassword(password);
  if (emailError) return res.status(HTTP_BAD_REQUEST).json(emailError);
  if (passwordError) return res.status(HTTP_BAD_REQUEST).json(passwordError);
  res.status(HTTP_OK).json({ token: '7mqaVRXJSp886CGr' });
});

// <-- ENDPOINT AVALIADOR -->
app.get('/', (_request, response) => {
  response.status(HTTP_OK).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
