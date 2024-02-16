var express = require('express');
const teacherRoute = express.Router();
const cors = require('cors');

//Imports Cors Settings
const validURL = require('../../program');

//Teacher Login Authentication
teacherRoute.route("/teacherAuth/:checkPass", cors(validURL.corsOptions))
  .get(async (req, res) => {
    if(process.env.teacherAuth == req.params.checkPass){
      return res.status(200)
      .json({ 
        success: "Login Successful: Teacher",
        status: 200
      });    
    }
    else{
      return res.status(200)
      .json({ 
        error: "Login Failed: Incorrect Credentials",
        status: 401
      });    
    }
  });


//import Student model
const Student = require('../models/student');

//Add New Student Results
teacherRoute.route("/create", cors(validURL.corsOptions))
.post(async (req, res, next) => {
  await Student.create(req.body)
    .then((result) => {
      res.json({
        data: result,
        message: "Student score added successfully!",
        status: 200
      });
    })
    .catch((err) => {
      return next(err);
    });
});


// Get All Student Results
teacherRoute.route("/", cors(validURL.corsOptions))
.get(async (req, res, next) => {
  await Student.find()
    .then((result) => {
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify(result));
    })
    .catch((err) => {
      return next (err);
    })
});


//Get Student Details
teacherRoute.route("/read/:id", cors(validURL.corsOptions))
.get(async (req, res, next) =>{
  await Student.findById(req.params.id, req.body)
  .then((result) => {
    res.json({
      data: result,
      message: "Student details retrieved successfully!",
      status: 200
    });
  })
  .catch((err) => {
    return next(err);
  });
});



// Update Student Detials
teacherRoute.route("/update/:id", cors(validURL.corsOptions))
.put(async (req, res, next) => {
  await Student.findByIdAndUpdate(req.params.id, { $set: req.body })
    .then((result) => {
      res.json({
        data: result,
        msg: "Student details updated successfully."
      });
    })
    .catch((err) => {
      console.log(err);
    });
});


// Delete Employee Details
teacherRoute.route("/delete/:id", cors(validURL.corsOptions))
.delete(async (req, res) => {
  await Student.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({
        msg: "Student details deleted successfully!"
      });
    })
    .catch((err) => {
      console.log(err);
    });
});


module.exports = teacherRoute;
