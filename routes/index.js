const express = require('express');
const router = express.Router();
const mentorController = require('../controllers/mentorController');
const studentController = require('../controllers/studentController');

router.post('/mentors', mentorController.createMentor);
router.post('/students', studentController.createStudent);
router.post('/assign-student', studentController.assignStudentToMentor);
router.post('/change-mentor', studentController.changeMentorForStudent);
router.get('/students/:mentorId', studentController.getStudentsForMentor);
router.get('/previous-mentor/:studentId', studentController.getPreviousMentorForStudent);

module.exports = router;
