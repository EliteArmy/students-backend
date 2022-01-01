const express = require('express');

// We dont want to grab anything from the file
// by calling require that file runs and ensure mangoose
// connects to the database
require('./db/mongoose');

const studentRouter = require('./routers/student');

const app = express();

app.use(express.json());

app.use(studentRouter);

module.exports = app;
