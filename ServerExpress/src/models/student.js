//imports mongoose
const mongoose = require('mongoose')

const { Schema } = mongoose;

//student schema
const studentSchema = new Schema({
  roll: {
    type : Number,
    unique : true
  },
  name: {
    type : String
  },     
  dob:{
    type : Date
  },
  score: {
    type : Number
  }  
});

//exports the model
module.exports = mongoose.model('Student', studentSchema)