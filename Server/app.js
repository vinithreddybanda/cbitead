const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const url = 'mongodb://localhost:27020,localhost:27021,localhost:27022/cbit2?replicaSet=m101';

const app = express();

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const con = mongoose.connection;

con.on('open', () => {
    console.log('connected...');
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Update the route to use the student routes instead of alien routes
const studentRouter = require('./Routes/studentRoutes');
app.use('/students', studentRouter);

app.listen(9000, () => {
    console.log('server started..');
});
