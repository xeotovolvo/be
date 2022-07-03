import express from 'express';

import { getAccessToken } from '../controllers/commonsController.js';
import { createInstructor, getAllInstructors, getInstructor, updateInstructor, deleteInstructor, login } from '../controllers/instructorController.js';

const router = express.Router();
//http://localhost:5000/instructor

router.post('/create', createInstructor);
router.get('/readAll', getAllInstructors);
router.get('/read/:id', getInstructor);
router.patch('/update/:id', updateInstructor);
router.delete('/delete/:id', deleteInstructor);
router.post('/login', login);
router.post('/refresh-token', getAccessToken);

export default router;