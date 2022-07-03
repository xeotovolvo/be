import mongoose from 'mongoose';
import { StudentModel } from '../models/studentModel.js';
import { createRefreshToken, createAccessToken } from './commonsController.js';

export const createStudent = (req, res) => {
    const data = new StudentModel({
        _id: mongoose.Types.ObjectId(),
        studentID: req.body.studentID,
        image: req.body.image,
        fullName: req.body.fullName,
        email: req.body.email,
        class: req.body.class,
        address: req.body.address,
    })

    try {
        const dataToSave = data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}
        
export const getAllStudents = async (req, res) => {
    try {
        const data = await StudentModel.find();
        console.log(data)
        res.status(200).json({ message: "Success", data })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }

}
        
export const getStudent = async (req, res) => {
    try {
        const data = await StudentModel.findById(req.params.id);
        console.log(data)
        res.status(200).json({ message: "Success", data })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }

}

export const updateStudent = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await StudentModel.findByIdAndUpdate(
            id, updatedData, options
        )

        res.status(200), json({ message: "Success" })
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const deleteStudent = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await StudentModel.findByIdAndDelete(id)
        res.status(200), json({ message: "Success" })
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }

}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await StudentModel.findOne({ email })
        if (!user) return res.status(400).json({ msg: "This email does not exist." })

        // const isMatch = await bcrypt.compare(password, user.password)
        if(password != user.password) return res.status(400).json({msg: "Password is incorrect."})

        const refresh_token = createRefreshToken({ id: user.instructorID })
        res.cookie('refreshtoken', refresh_token, {
            httpOnly: true,
            path: '/student/refresh-token',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        })
        res.status(200).json({ message: "Login Success!!!", access_token: refresh_token})
    } catch (err) {
        return res.status(500).json({ msg: err.message})
    }
};