const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  dob: {
    type: Date,
    required: true
  },
  numClasses: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Teacher', teacherSchema);
