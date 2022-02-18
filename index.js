const express = require('express');
const fs = require('fs/promises');

const app = express();

const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND_STATUS = 404;
const PORT = '3000';
const TALKERS_FILE = './talker.json';

// <-- REQUISITO 01 -->
app.get('/talker', async (_req, res, _next) => {
  const talkersList = JSON.parse(await fs.readFile(TALKERS_FILE));

  if (talkersList.length === 0) {
    return res.status(HTTP_OK_STATUS).send([]);
  }

  res.status(HTTP_OK_STATUS).json(talkersList);
});

// <-- REQUISITO 02 -->
app.get('/talker/:id', async (req, res, _next) => {
  const { id } = req.params;
  const talkersList = JSON.parse(await fs.readFile(TALKERS_FILE));
  const talker = talkersList.find((t) => t.id === parseInt(id, 10));

  if (!talker) {
    res.status(HTTP_NOT_FOUND_STATUS).json({ message: 'Pessoa palestrante não encontrada' });
  }
  
  res.status(HTTP_OK_STATUS).json(talker);
});

// <-- ENDPOINT AVALIADOR -->
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
