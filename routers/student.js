import express from 'express';
import { getAccessToken } from '../controllers/commonsController.js';
import { createStudent, getAllStudents, getStudent, updateStudent, deleteStudent } from '../controllers/studentController.js';

const router = express.Router();
//http://localhost:5000/student

router.post('/create', createStudent);
router.get('/getAll', getAllStudents);
router.get('/get/:id', getStudent);
router.patch('/update/:id', updateStudent);
router.delete('/delete/:id', deleteStudent);
router.post('/refresh-token', getAccessToken);

export default router;