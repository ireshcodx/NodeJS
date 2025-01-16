const StudentService = require('../services/studentService');
const { logger } = require('../utils/logger');

const getAllStudents = async (req, res) => {
  try {
    const results = await StudentService.getAllStudents();
    res.status(200).json(results);
  } catch (err) {
    logger.error(`[studentController.js] error: ${err.message}`);
    res.status(500).send(err.message);
  }
};

const getStudentById = async (req, res) => {
  try {
    const id = req.body.id;
    if(typeof(id) == 'string'){
      return res.status(400).send('Id must Integer');
    }
    const result = await StudentService.getStudentById(id);
    if (!result) {
      return res.status(404).send('Student not found');
    }
    return res.status(200).json(result);
  } catch (err) {
    logger.error(`[studentController.js] error: ${err.message}`);
    return res.status(500).send(err.message);
  }
};

const createStudent = async (req, res) => {
  try {
    const data = req.body;
    const result = await StudentService.createStudent(data);
    res.status(201).send(`Student added with ID: ${result.student_id}`);
  } catch (err) {
    logger.error(`[studentController.js] error: ${err.message}`);
    res.status(500).send(err.message);
  }
};

const updateStudent = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const result = await StudentService.updateStudent(id, data);
    res.status(200).json({ message: 'Student updated successfully' });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const id = req.body.id;
    if(typeof(id)=='string'){
      return res.status(400).send('Id must Integer');
    }
    await StudentService.deleteStudent(id);
    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (err) {
    res.status(404).json(err.message);
  }
};

module.exports = { getAllStudents, getStudentById, createStudent, updateStudent, deleteStudent };
