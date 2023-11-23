const Mentor = require('../models/mentor');

exports.createMentor = async (req, res) => {
    try {
      const mentor = await Mentor.create(req.body);
      res.status(201).json(mentor);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };