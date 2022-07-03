import express from 'express';
import { createAttendance, getAllAttendances, getAttendance, updateAttendance, deleteAttendance } from '../controllers/attendanceController.js';

const router = express.Router();
//http://localhost:5000/attendance

router.get('/getAll', getAllAttendances);
router.get('/get/:id', getAttendance);
router.post('/updateAttendance/:id', updateAttendance);
router.delete('/deleteAttendance', deleteAttendance);

export default router;