const express = require('express');
const router = express.Router();
const validate = require('../Middleware/Validate');
const { createStudentSchema, updateStudentSchema } = require('../Middleware/schema/studentSchema');
const StudentController = require('../controller/studentController');

//! Define routes for student operations
router.get('/', StudentController.getAllStudents);
router.get('/getstudentbyId', StudentController.getStudentById);
router.post('/addstudent', validate(createStudentSchema), StudentController.createStudent);
router.put('/updatestudent', validate(updateStudentSchema), StudentController.updateStudent);
router.delete('/deletestudent', StudentController.deleteStudent);

module.exports = router;