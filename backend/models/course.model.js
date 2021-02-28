const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const courseSchema = new Schema({
  coursename: { type: String, required: true },
  studentId: { type: Number, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  date: { type: Date, required: true },
}, {
  timestamps: true,
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;