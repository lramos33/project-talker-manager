const NAME_REQUIRED = { message: 'O campo "name" é obrigatório' };
const INVALID_NAME = { message: 'O "name" deve ter pelo menos 3 caracteres' };
const AGE_REQUIRED = { message: 'O campo "age" é obrigatório' };
const INVALID_AGE = { message: 'A pessoa palestrante deve ser maior de idade' };
const INVALID_WATCH = { message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' };
const INVALID_RATE = { message: 'O campo "rate" deve ser um inteiro de 1 à 5' };
const TALK_REQUIRED = { 
  message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
};

const HTTP_BAD_REQUEST = 400;
const DATE_REGEX = /^(0?[1-9]|[12][0-9]|3[01])[/](0?[1-9]|1[012])[/]\d{4}$/;

const validateTalkerName = (name, res) => {
  if (!name || name === '') {
    return res.status(HTTP_BAD_REQUEST).json(NAME_REQUIRED);
  }
  if (name.length < 3) {
    return res.status(HTTP_BAD_REQUEST).json(INVALID_NAME);
  }
};

const validateTalkerAge = (age, res) => {
  if (!age || age === '') {
    return res.status(HTTP_BAD_REQUEST).json(AGE_REQUIRED);
  }
  if (age < 18) {
    return res.status(HTTP_BAD_REQUEST).json(INVALID_AGE);
  }
};

const validateTalkerTalk = (talk, res) => {
  if (!talk || !talk.watchedAt || !talk.rate) {
    return res.status(HTTP_BAD_REQUEST).json(TALK_REQUIRED);
  }
};

const validateTalkerWatchedAt = (talk, res) => {
  if (!talk.watchedAt.match(DATE_REGEX)) {
    return res.status(HTTP_BAD_REQUEST).json(INVALID_WATCH);
  }
};

const validateTalkerRate = (talk, res) => {
  if (!Number.isInteger(talk.rate) || talk.rate < 1 || talk.rate > 5) {
    return res.status(HTTP_BAD_REQUEST).json(INVALID_RATE);
  }
};

const validateBodyTalker = (req, res, next) => {
  const { name, age, talk } = req.body;
  validateTalkerName(name, res);
  validateTalkerAge(age, res);
  validateTalkerTalk(talk, res);
  validateTalkerWatchedAt(talk, res);
  validateTalkerRate(talk, res);
  next();
};

module.exports = validateBodyTalker;