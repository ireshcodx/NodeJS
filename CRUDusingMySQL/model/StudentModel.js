const db = require('../config/database');
const studentService = require('../services/studentService')
const getAllStudents = () => {
  return new Promise((resolve, reject) => {
    db.query('select * from students', (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });

  // try {
  //   const results = await StudentModel.getAllStudents();
  // } catch (error) {
    
  // }

};

const getStudentById = (id) => {
  return new Promise((resolve, reject) => {
    db.query('select * from students where student_id = ?', [id], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

const createStudent = (data) => {
  return new Promise((resolve, reject) => {
    db.query('insert into students set ?', data, (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

const updateStudent = (id, data) => {
  return new Promise((resolve, reject) => {
    db.query('update students set ? where student_id = ?', [data, id], (err) => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
};

const deleteStudent = (id) => {
  return new Promise((resolve, reject) => {
    db.query('delete from students where student_id = ?', [id], (err) => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
};

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};
