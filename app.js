const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');

const { usersRoute } = require('./routes/users');
const { cardsRoute } = require('./routes/cards');
const { notFoundRoute } = require('./routes/notFound');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use((req, res, next) => {
  req.user = {
    _id: '60a7fcfa9c572c3c1cd14d33',
  };

  next();
});

app.use('/users', usersRoute);
app.use('/cards', cardsRoute);
app.use('*', notFoundRoute);

app.use(helmet());

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`); // eslint-disable-line
});
