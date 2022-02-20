const fs = require('fs/promises');

const INVALID_TALKER = { message: 'Pessoa palestrante não encontrada' };

const HTTP_OK = 200;
const HTTP_NOT_FOUND = 404;
const TALKERS_FILE = './talker.json';

const getTalkerById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const talkersList = JSON.parse(await fs.readFile(TALKERS_FILE));
    const talker = talkersList.find((t) => t.id === parseInt(id, 10));
    if (!talker) {
      return res.status(HTTP_NOT_FOUND).json(INVALID_TALKER);
    }
    return res.status(HTTP_OK).json(talker);
  } catch (error) {
    next(error);
  }
};

module.exports = getTalkerById;