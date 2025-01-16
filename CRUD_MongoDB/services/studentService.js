const bcrypt = require('bcrypt');
const studentCollection = require('../models/studentModel');

const getAllStudents = async () => {
  return await studentCollection().find({}).toArray();
};

const getStudentById = async (id) => {
  return await studentCollection().findOne({ student_id: id });
};

const createStudent = async (data) => {
  const hashedEmail = await bcrypt.hash(data.email, 10);
  data.email = hashedEmail;
  return await studentCollection().insertOne(data);
};

const updateStudent = async (id, data) => {
  return await studentCollection().updateOne(
    { student_id: id },
    { $set: data }
  );
};

const deleteStudent = async (id) => {
  return await studentCollection().deleteOne({ student_id: id });
};

const compareEmail = async (plainEmail, hashedEmail) => {
  return await bcrypt.compare(plainEmail, hashedEmail);
};

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  compareEmail,
};
