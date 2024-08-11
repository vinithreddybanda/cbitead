const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const url = 'mongodb://localhost:27017/cbit';

const app = express();

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const con = mongoose.connection;

con.on('open', () => {
    console.log('connected...');
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const alienRouter = require('./Routes/aliens');
app.use('/aliens', alienRouter);

app.listen(9000, () => {
    console.log('server started..');
})