var mongoose = require('mongoose');
var studentModel = require('../models/studentModel.js');

module.exports = StudentList;


function StudentList(connection) {
  mongoose.connect(connection);
}


StudentList.prototype = {
    //CRUD functions
    createStudent: function(req, res) {
        
        var student = req.body.students;
        newStudent = new studentModel();

        newStudent._id = student.grNo;
        newStudent.name = student.fullname;
        newStudent.caste = student.caste;
        newStudent.birthPlace = student.birthPlace;
        newStudent.motherTongue = student.motherTongue;
        newStudent.dob = student.dob;
        newStudent.lastSchool = student.lastSchool;
        newStudent.doa = student.doa;
        newStudent.freeSeat = student.freeSeat;
        newStudent.classAdmitted = student.classAdmitted;
        newStudent.progress = student.progress;
        newStudent.conduct = student.conduct;
        newStudent.dol = student.dol;
        newStudent.classLeft = student.classLeft;
        newStudent.remark = student.remark;

        newStudent.save(function savedStudent(err) {
            if(err) {
                throw err;
            }
        });
        res.redirect('/');
    },

    readStudent: function(req, res) {
        studentModel.find({}, function foundStudents(err, studentsList) {
            res.render('generalregister', { title: 'Student List ', studentList: studentsList })
        });
    },


    updateStudent: function(req, res) {
        var completedTasks = req.body;
        for(taskId in completedTasks) {
            if(completedTasks[taskId] == 'true') {
                var conditions = { _id: taskId };
                var updates = { itemCompleted: completedTasks[taskId] };
                task.update(conditions, updates, function updatedTask(err) {
                    if(err) {
                        throw err;
                    }
                });
            }
        }
        res.redirect('/');
    },

    deleteStudent: function(req, res) {

    }
}