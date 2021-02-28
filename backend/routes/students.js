const router = require('express').Router();
let Student = require('../models/student.model');

router.route('/').get((req, res) => {
    Student.find()
    .then(students => res.json(students))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const name = req.body.name;
  const studentId = req.body.studentId;

  const newStudent = new Student({ studentId: studentId, name: name });

  newStudent.save()
    .then(() => res.json('Student added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
