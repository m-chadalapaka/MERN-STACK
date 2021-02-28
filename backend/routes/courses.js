const router = require('express').Router();
let Course = require('../models/course.model');

router.route('/').get((req, res) => {
    Course.find()
    .then(courses => res.json(courses))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {

  const coursename = req.body.coursename;
  const studentId = req.body.studentId;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  const newCourse = new Course({
    coursename,
    studentId,
    description,
    duration,
    date,
  });

  newCourse.save()
  .then(() => res.json('Course added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Course.findById(req.params.id)
    .then(course => res.json(course))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Course.findByIdAndDelete(req.params.id)
    .then(() => res.json('Course deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Course.findById(req.params.id)
    .then(course => {
      course.coursename = req.body.coursename;
      course.studentId = req.body.studentId;
      course.description = req.body.description;
      course.duration = Number(req.body.duration);
      course.date = Date.parse(req.body.date);

      course.save()
        .then(() => res.json('Course updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;