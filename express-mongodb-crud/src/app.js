const path = require('path');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const Task = require('../src/model/task');
const app = express();
const dbPath = 'mongodb://localhost:27017/crud-mongo';

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true
  })
);

// connection to db
mongoose
  .connect(dbPath)
  .then(db => console.log('db connected'))
  .catch(err => console.log(err));

// importing routes
const indexRoutes = require('./routes/index');

// settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
// routes
app.use('/', indexRoutes);

app.get('/list', async (req, res) => {
  const tasks = await Task.find();
  res.status(200).send({
    success: 'true',
    message: 'data retrieved successfully',
    tasks
  });
});
app.post('/adds', async (req, res, next) => {
  // console.log('req.body', req.body);
  const task = new Task(req.body);
  await task.save();
});

app.post('/update', async (req, res, next) => {
  // console.log(req.body);
  const { updateId } = req.body;
  await Task.update({ _id: updateId }, req.body);
});

app.get('/delete/id', async (req, res, next) => {
  console.log(req.params);
  let { id } = req.params;
  await Task.remove({ _id: id });
});

app.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`);
});
