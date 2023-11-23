const Student = require('../models/student');
const Mentor = require('../models/mentor');

exports.createStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.assignStudentToMentor = async (req, res) => {
  try {
    const { mentorId, studentId } = req.body;

    const student = await Student.findByIdAndUpdate(
      studentId,
      { mentor: mentorId },
      { new: true }
    );

    const mentor = await Mentor.findByIdAndUpdate(
      mentorId,
      { $addToSet: { students: studentId } },
      { new: true }
    );

    res.status(200).json({ student, mentor });
  } catch (error) {
    console.error(error); // Log the error to the console for debugging
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.changeMentorForStudent = async (req, res) => {
  try {
    const { studentId, newMentorId } = req.body;

    const student = await Student.findByIdAndUpdate(
      studentId,
      { mentor: newMentorId },
      { new: true }
    );

    const oldMentor = await Mentor.findOneAndUpdate(
      { students: studentId },
      { $pull: { students: studentId } },
      { new: true }
    );

    const newMentor = await Mentor.findByIdAndUpdate(
      newMentorId,
      { $addToSet: { students: studentId } },
      { new: true }
    );

    res.status(200).json({ student, oldMentor, newMentor });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getStudentsForMentor = async (req, res) => {
  try {
    const { mentorId } = req.params;
    const students = await Student.find({ mentor: mentorId });
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getPreviousMentorForStudent = async (req, res) => {
    try {
      const { studentId } = req.params;
      console.log('Student ID:', studentId);
  
      const student = await Student.findById(studentId).populate('mentor');
  
      if (!student) {
        console.log('Student not found');
        return res.status(404).json({ error: 'Student not found' });
      }
  
      console.log('Previous Mentor:', student.mentor);
      res.status(200).json(student.mentor);
    } catch (error) {
      console.error('Error getting previous mentor:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
