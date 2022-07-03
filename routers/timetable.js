import express from 'express';
import { createTimetable, getAllTimetables, getTimetable, deleteTimetable } from '../controllers/timetableController.js';

const router = express.Router();
//http://localhost:5000/timetable

router.post('/create', createTimetable);
router.get('/getAll', getAllTimetables);
router.get('/get/:id', getTimetable);
router.delete('/delete/:id', deleteTimetable);

export default router;