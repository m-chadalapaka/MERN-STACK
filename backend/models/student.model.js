const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const studentSchema = new Schema({
  studentId: { type: Number, required: true },
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
}, {
  timestamps: true,
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;