const { json } = require('express');
const db = require('../config/database');

const getAllStudents = () => {
  return new Promise((resolve, reject) => {

    db.query('call SP_temptable()', (err, results) => {
      // console.log('from service ',err || results[0]);
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

const getStudentById = (id) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM students WHERE student_id = ?', [id], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

const createStudent = (data) => {
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO students SET ?', data, (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

// const updateStudent = (id, data) => {
//   if(data.hobbies){
//     data.hobbies=JSON.stringify(data.hobbies)
//   }
//   return new Promise((resolve, reject) => {
//     db.query('UPDATE students SET ? WHERE student_id = ?  and status=0', [data, id], (err, results) => {
//       if (err) {
//         return reject(err);
//       }
//       if (results.affectedRows === 0) {
//         return reject(new Error('Student not found')); 
//       }
//       resolve({ message: 'Student updated successfully' }); 
//     });
//   });
// };

// const updateStudent = (id, data) => {
//   return new Promise((resolve, reject) => {
//     let query = 'UPDATE students SET ';
//     const params = [];
//     //! Checking if hobbies fields needs to be updated
//     if (data.hobbies && data.hobbies.outdoor) {
//       query += "hobbies = JSON_SET(hobbies, '$.outdoor', ?) ";
//       params.push(data.hobbies.outdoor);
//     }
//     if(data.hobbies && data.hobbies.indoor){
//       query += "hobbies = JSON_SET(hobbies, '$.indoor',?)";
//       params.push(data.hobbies.indoor);
//     }
//     Object.keys(data).forEach((key) => {        //! handling other fields
//       if (key !== 'hobbies') {
//         query += `, ${key} = ?`;
//         params.push(data[key]);
//       }
//     });
//     query += ' WHERE student_id = ? AND status = 0';
//     params.push(id);
//     console.log('Generated Query:', query);
//     console.log('Parameters:', params);

//     db.execute(query, params, (err, results) => {
//       if (err) {
//         return reject(err);
//       }
//       if (results.affectedRows === 0) {
//         return reject(new Error('Student not found'));
//       }
//       resolve({ message: 'Student updated successfully' });
//     });
//   });
// };

const updateStudent = (id, data) => {
  return new Promise((resolve, reject) => {
    if (data.hobbies) {
      let query = 'UPDATE students SET hobbies = ';
      const params = [];
      let jsonSetExpression = 'JSON_SET(hobbies';

      if (data.hobbies.outdoor) {
        jsonSetExpression += ", '$.outdoor', ?";
        params.push(data.hobbies.outdoor);
      }

      if (data.hobbies.indoor) {
        jsonSetExpression += ", '$.indoor', ?";
        params.push(data.hobbies.indoor);
      }

      jsonSetExpression += ')'; //! Closing JSON_SET
      query += jsonSetExpression + ' WHERE student_id = ?';
      params.push(id);

      // console.log('Generated Query:', query);
      // console.log('Generated Params:', params);

      db.query(query, params, (err, results) => {
        if (err) {
          return reject(err);
        }
        if (results.affectedRows === 0) {
          return reject(new Error('Student not found'));
        }
        resolve({ message: 'Student updated successfully' });
      });
    } else {
      executeUpdateQuery(id, data, resolve, reject);
    }
  });
};

//! handling update query for single or multiple updates
const executeUpdateQuery = (id, data, resolve, reject) => {
  let query = 'UPDATE students SET ? WHERE student_id = ? AND status = 0';
  db.query(query, [data, id], (err, results) => {
    if (err) {
      return reject(err);
    }
    if (results.affectedRows === 0) {
      return reject(new Error('Student not found'));
    }
    resolve({ message: 'Student updated successfully' });
  });
};

const deleteStudent = (id) => {
  return new Promise((resolve, reject) => {
    db.query('update students set status=1 WHERE student_id = ?', [id], (err, results) => {
      if (err) {
        return reject(err);
      }
      if (results.affectedRows === 0) {
        return reject(new Error('No Student with given id'));
      }
      resolve({ message: 'Student deleted successfully' });
    });
  });
};

module.exports = { getAllStudents, getStudentById, createStudent, updateStudent, deleteStudent };