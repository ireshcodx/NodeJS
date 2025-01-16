const Student = require('../model/Student');

// Get all students with status = 0
const getAllStudents = async () => {
  return await Student.findAll({
    where: { status: 0 },
  });
};

// Get a student by ID with status = 0
const getStudentById = async (id) => {
  return await Student.findOne({
    where: { student_id: id, status: 0 },
  });
};

// Create a new student
const createStudent = async (data) => {
  return await Student.create(data);
};

// Update a student by ID
const updateStudent = async (id, data) => {
  const result = await Student.update(data, { //! update function used
    where: { student_id: id, status: 0 },
    returning: true,
  });

  if (result[0] === 0) throw new Error('Student not found or inactive');
  return result[1][0]; // Returns the updated student
};

// Soft delete a student by updating the status to 1
const deleteStudent = async (id) => {
  const result = await Student.update({ status: 1 }, {
    where: { student_id: id, status: 0 },
  });

  if (result[0] === 0) throw new Error('No Student with given ID');
  return `Student with ID ${id} marked as deleted (status set to 1).`;
};

// Exporting all functions
module.exports = { getAllStudents, getStudentById, createStudent, updateStudent, deleteStudent };
