import mongoose from 'mongoose';
import { TimetableModel } from '../models/timetableModel.js';

export const createTimetable = (req, res) => {
    const data = new TimetableModel({
        _id: mongoose.Types.ObjectId(),
        Date: req.body.Date,
        Slot: req.body.Slot,
        Class: req.body.Class,
        InstructorID: req.body.InstructorID,

    })

    try {
        const dataToSave = data.save();
        res.status(200).json({ dataToSave })
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const getAllTimetables = async (req, res) => {
    try {
        const data = await TimetableModel.find();
        console.log(data)
        res.status(200).json({ message: "Success", data })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }

}
export const getTimetable = async (req, res) => {
    try {
        const data = await TimetableModel.findById(req.params.id);
        console.log(data)
        res.status(200).json({ message: "Success", data })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }

}


export const deleteTimetable = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await TimetableModel.findByIdAndDelete(id)
        res.status(200), json({ message: "Success" })
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}