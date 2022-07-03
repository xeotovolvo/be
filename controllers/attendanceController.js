import mongoose from 'mongoose';
import { AttendanceModel } from '../models/attendanceModel.js';
import sendEmail from './sendMailController.js'
;
export const createAttendance = (req, res) => {
    const data = new AttendanceModel({
        _id: mongoose.Types.ObjectId(),
        StudentID: req.body.StudentID,
        TimetableID: req.body.TimetableID,
        Status: req.body.Status,
        Datetime: req.body.DateTime,
    })
    try {
        const dataToSave = data.save();
        res.status(200).json({ dataToSave })
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}
export const getAllAttendances = async (req, res) => {
    try {
        const data = await AttendanceModel.find();
        console.log(data)
        res.status(200).json({ message: "Success", data })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}


export const getAttendance = async (req, res) => {
    try {
        const data = await AttendanceModel.findById(req.params.id);
        console.log(data)
        res.status(200).json({ message: "Success", data })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }

}
        
export const updateAttendance = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await AttendanceModel.findByIdAndUpdate(
            id, updatedData, options
        )

        res.status(200), json({ message: "Success" })
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}
        
export const deleteAttendance = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await AttendanceModel.findByIdAndDelete(id)
        res.status(200), json({ message: "Success" })
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }

}
        
