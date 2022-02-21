const fs = require('fs/promises');

const HTTP_CREATED = 201;
const TALKERS_FILE = './talker.json';

const addNewTalker = async (req, res, next) => {
  try {
    const { name, age, talk } = req.body;
    const talkersList = JSON.parse(await fs.readFile(TALKERS_FILE));
    const newTalker = { id: talkersList.length + 1, name, age, talk };
    talkersList.push(newTalker);
    await fs.writeFile(TALKERS_FILE, JSON.stringify(talkersList));
    return res.status(HTTP_CREATED).json(newTalker);
  } catch (error) {
    next(error);
  }
};

module.exports = addNewTalker;