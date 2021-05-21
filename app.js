const express = require('express');
const mongoose = require('mongoose');
const { usersRoute } = require('./routes/users');
const { cardsRoute } = require('./routes/cards');

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
    _id: '60a6d1a84d24971e10a25125',
  };

  next();
});

app.use('/users', usersRoute);
app.use('/cards', cardsRoute);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`); // eslint-disable-line
});
