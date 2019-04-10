const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Coordinate = new Schema({
  latitude: Number,
  longitude: Number
});

const TaskSchema = Schema({
  title: String,
  description: String,
  coordinate: Coordinate
});

module.exports = mongoose.model('tasks', TaskSchema);
