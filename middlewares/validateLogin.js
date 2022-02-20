const EMAIL_REQUIRED = { message: 'O campo "email" é obrigatório' };
const INVALID_EMAIL = { message: 'O "email" deve ter o formato "email@email.com"' };
const PASSWORD_REQUIRED = { message: 'O campo "password" é obrigatório' };
const INVALID_PASSWORD = { message: 'O "password" deve ter pelo menos 6 caracteres' };

const HTTP_OK = 200;
const HTTP_BAD_REQUEST = 400;
const EMAIL_REGEX = /(.+)@(.+){2,}\.(.+){2,}/;
const TOKEN = '7mqaVRXJSp886CGr';

const validateEmail = (email, res) => {
  if (!email || email === '') {
    return res.status(HTTP_BAD_REQUEST).json(EMAIL_REQUIRED);
  }
  if (!email.match(EMAIL_REGEX)) {
    return res.status(HTTP_BAD_REQUEST).json(INVALID_EMAIL);
  }
};

const validatePassword = (password, res) => {
  if (!password || password === '') {
    return res.status(HTTP_BAD_REQUEST).json(PASSWORD_REQUIRED);
  }
  if (password.length < 6) {
    return res.status(HTTP_BAD_REQUEST).json(INVALID_PASSWORD);
  }
};

const validateLogin = (req, res, next) => {
  try {
    const { email, password } = req.body;
    validateEmail(email, res);
    validatePassword(password, res);
    return res.status(HTTP_OK).json({ token: TOKEN });
  } catch (error) {
    next(error);
  }
};

module.exports = validateLogin;