require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const { errors } = require('celebrate');
const { usersRoute } = require('./routes/users');
const { cardsRoute } = require('./routes/cards');
const { notFoundRoute } = require('./routes/notFound');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { validateSignUp, validateSignIn } = require('./middlewares/validation');

const { PORT = 3000 } = process.env;
const app = express();

app.use(cookieParser());

app.use(express.json());

app.use(helmet());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.post('/signin', validateSignIn, login);
app.post('/signup', validateSignUp, createUser);

app.use('/users', auth, usersRoute);
app.use('/cards', auth, cardsRoute);
app.use('*', notFoundRoute);

app.use(errors());
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500
      ? 'На сервере произошла ошибка'
      : message,
  });

  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`); // eslint-disable-line
});
