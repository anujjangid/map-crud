const express = require('express');
const router = express.Router();
const Task = require('../model/task');

router.get('/', async (req, res) => {
  const tasks = await Task.find();

  res.render('index', {
    tasks
  });
});

// router.post('/adds', async (req, res, next) => {
//   const task = new Task(req.body);
//   console.log(req.body);
//   await task.save();
//   res.redirect('/');
// });

router.post('/adds', async (req, res, next) => {
  const updateTask = {
    title: req.body.title,
    description: req.body.description,
    coordinate: {
      latitude: req.body.coordinate.latitude,
      longitude: req.body.coordinate.longitude
    }
  };
  console.log(req.body.coordinate);
  const task = new Task(updateTask);
  await task.save();
  res.redirect('/');
});

router.get('/turn/:id', async (req, res, next) => {
  let { id } = req.params;
  const task = await Task.findById(id);
  task.status = !task.status;
  await task.save();
  res.redirect('/');
});

router.get('/edit/:id', async (req, res, next) => {
  const task = await Task.findById(req.params.id);
  // console.log(task);
  res.render('edit', { task });
});

router.post('/edit/:id', async (req, res, next) => {
  const { id } = req.params;
  await Task.update({ _id: id }, req.body);
  res.redirect('/');
});

router.get('/delete/:id', async (req, res, next) => {
  console.log(req.body);
  let { id } = req.params;
  await Task.remove({ _id: id });
  res.redirect('/');
});

module.exports = router;
