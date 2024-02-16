const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');


//MongoDB Configuration & Connection
const connectDB = require("../ServerExpress/src/database/connection");
dotenv.config({ path: '../ServerExpress/config.env' })
connectDB();

const server = express();

//Setting up port with express js
const PORT = process.env.PORT || 8080
server.listen(PORT, () => { console.log(`Server is running on http://localhost:${PORT}/api`) });


//Teacher and Student routes
const teacherRoute = require('../ServerExpress/src/routes/teacher.route');
const studentRoute = require('../ServerExpress/src/routes/student.route');

server.use(cors())
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: false }))
server.use(express.static(path.join(__dirname, 'dist/AngularWebUI'))) 
server.use('/', express.static(path.join(__dirname, 'dist/AngularWebUI')))

server.use('/api', teacherRoute)
server.use('/api', studentRoute)


//Find 404 and hand over to error handler
server.use((req, res, next) => {
    next(createError(404))
})


//Error handler
server.use(function (err, req, res, next) {
    console.error(err.message) // Log error message in our server's console
    if (!err.statusCode) err.statusCode = 500 // If err has no specified error code, set error code to 'Internal Server Error (500)'
    res.status(err.statusCode).send(err.message) // All HTTP requests must have a response, so let's send back an error with its status code and message
})
