const fs = require('fs/promises');

const HTTP_OK = 200;
const TALKERS_FILE = './talker.json';

const getAllTalkers = async (_req, res, next) => {
  try {
    const talkersList = JSON.parse(await fs.readFile(TALKERS_FILE));
    if (talkersList.length === 0) {
      return res.status(HTTP_OK).send([]);
    }
    return res.status(HTTP_OK).json(talkersList);
  } catch (error) {
    next(error);
  }
};

module.exports = getAllTalkers;