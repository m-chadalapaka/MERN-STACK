const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();


// Express server
const app = express();
const port = process.env.PORT || 5000;

app.use(cors()); // cors middleware and helps to parse json
app.use(express.json());

// Mongoose connection
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

// Routing
const coursesRouter = require('./routes/courses');
const studentsRouter = require('./routes/students');

app.use('/courses', coursesRouter);
app.use('/students', studentsRouter);


// start the server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});