var express = require('express');
const studentRoute = express.Router();
const cors = require('cors');

//import Cors Settings
const validURL = require('../../program');

//import Student model
const Student = require('../models/student');


//Roll No. Login & Get Student Details
studentRoute.route("/studentAuth/:roll", cors(validURL.corsOptions))
.get(async (req, res, next) =>{
  await Student.findOne({ roll: req.params.roll}, req.body)
  .then((result) => {
    if (result !== null) {
      res.json({
        data: result,
        message: "Login Success: Student details retrieved!",
        status: 200
      });
    }
    else{
      return res.status(401)
      .json({ 
        message: 'Login Failed: Incorrect Credentials',
        status: 401
      });    
    }
  })
  .catch((err) => {
    return next(err);
  });
});


module.exports = studentRoute;


