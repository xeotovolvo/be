import express from 'express';
import cors from 'cors';
import attendanceController from './routers/attendance.js';
import instructorController from './routers/instructor.js';
import studentController from './routers/student.js';
import timetableController from './routers/timetable.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import https from 'https';
import fs from 'fs';
// const https = require('https')
// const fs = require('fs')

dotenv.config();

const app = express();
const PORT = process.env.PORT || 80;
const PORTSSL = process.env.PORTSSL || 443;

const URI = process.env.DATABASE_URL;

app.use(cors());
app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ extended: true, limit: '30mb' }));

// link api
app.use('/attendance', attendanceController);
app.use('/instructor', instructorController);
app.use('/student', studentController);
app.use('/timetable', timetableController);

const options = {
  key: fs.readFileSync('private.key'),
  cert: fs.readFileSync('certificate.crt'),
}

mongoose
  .connect(URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connected to DB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
    https.createServer(options, app).listen(PORTSSL, () => {
      console.log(`Server is running on port ${PORTSSL}`);
    });
  })
  .catch((err) => {
    console.log('err', err);
  });

