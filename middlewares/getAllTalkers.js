const fs = require('fs/promises');

const HTTP_OK = 200;
const TALKERS_FILE = './talker.json';

const getAllTalkers = async (_req, res, _next) => {
  const talkersList = JSON.parse(await fs.readFile(TALKERS_FILE));
  if (talkersList.length === 0) {
    return res.status(HTTP_OK).send([]);
  }
  res.status(HTTP_OK).json(talkersList);
};

module.exports = getAllTalkers;