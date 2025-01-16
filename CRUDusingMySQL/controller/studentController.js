const { response } = require('express');
const StudentService = require('../services/studentService');
// const StudentModel = require('../model/StudentModel');
const { logger } = require('../utils/logger');
// const { object } = require('joi');

//? Get all Students
const getAllStudents = async (req, res) => {
  try {
    if(req.body && Object.keys(req.body).length > 0){
     return res.status(404).send('Body should be empty');
    }
    const results = await StudentService.getAllStudents();
    //const results = await StudentModel.getAllStudents();
    return res.status(200).json(results[0]);
  } catch (err) {
    logger.error(`${new Date().toISOString()} [studentController.js] error: ${err.message}`);
    console.log(err.message);
    return res.status(500).send(err.message);
  }
};

//? Get Student by ID
const getStudentById = async (req, res) => {
  try {
    const id = req.body.id;
    if(typeof(id) == 'string'){
      return res.status(404).send('ID should be a number');
    }
    const results = await StudentService.getStudentById(id);
    if (results.length === 0) {
      return res.status(404).send('Student not found');
    }
    res.status(200).json(results);
  } catch (err) {
    logger.error(`${new Date().toISOString()} [studentController.js] error: ${err.message}`);
    res.status(500).send(err.message);
  }
};

//? Create a new Student
const createStudent = async (req, res) => {
  try {
    const data = req.body;
    const results = await StudentService.createStudent(data);
    res.status(200).send(`Student added with ID: ${results.insertId}`);
  } catch (err) {
    logger.error(`${new Date().toISOString()} [studentController.js] error: ${err.message}`);
    res.status(500).send(err.message);
  }
};

//? Update a Student
const updateStudent = async (req, res) => {
  try {
    const id = req.body.student_id;
    const data = req.body;
    // console.log(id,data);
    if(typeof(id)=='string'){
      return res.status(404).send('ID should be a number');
    }
    // console.log('from controller ',data);
    const result = await StudentService.updateStudent(id, data);
    res.status(200).json(result.message);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

//! Delete a Student
const deleteStudent = async (req, res) => {
  try {
    const id = req.body.id;
    if(typeof(id) == 'string'){
      return res.status(404).send('ID should be a number');
    }
    const result = await StudentService.deleteStudent(id);
    res.status(200).json(result.message);
  } catch (err) {
    res.status(404).json(err.message);
  }
};

module.exports = { getAllStudents, getStudentById, createStudent, updateStudent, deleteStudent };