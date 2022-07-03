import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import fetch from 'node-fetch';

import { InstructorModel } from '../models/instructorModel.js';
import { createRefreshToken, createAccessToken } from './commonsController.js';

export const createInstructor = (req, res) => {
    const data = new InstructorModel({
        _id: mongoose.Types.ObjectId(),
        instructorID: req.body.instructorID,
        fullName: req.body.fullName,
        phone: req.body.phone,
        email: req.body.email,
    })
    try {
        const dataToSave = data.save();
        res.status(200).json({ dataToSave })
    }
     catch (error) {
          res.status(400).json({ message: error.message })
    }
}

export const getAllInstructors = async (req, res) => {
    try {
        const data = await InstructorModel.find();
        console.log(data)
        res.status(200).json({ message: "Success", data })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getInstructor = async (req, res) => {
    try {
        const data = await InstructorModel.findById(req.params.id);
        console.log(data)
        res.status(200).json({ message: "Success", data })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }

}

export const updateInstructor = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await InstructorModel.findByIdAndUpdate(
            id, updatedData, options
        )

        res.status(200).json({ message: "Success" })
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const deleteInstructor = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await InstructorModel.findByIdAndDelete(id)
        res.status(200).json({ message: "Success" })
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await InstructorModel.findOne({ email })
        if (!user) return res.status(400).json({ msg: "This email does not exist." })

        // const isMatch = await bcrypt.compare(password, user.password)
        if(password != user.password) return res.status(400).json({msg: "Password is incorrect."})

        const refresh_token = createRefreshToken({ id: user.instructorID })
        res.cookie('refreshtoken', refresh_token, {
            httpOnly: true,
            path: '/instructor/refresh-token',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        })
        res.status(200).json({ message: "Login Success!!!", access_token: refresh_token})
    } catch (err) {
        return res.status(500).json({ msg: err.message})
    }
};

// export const forgotPassword = async (req, res) => {
//     try {
//         const { email } = req.body
//         const user = await InstructorModel.findOne({ email })
//         if (!user) return res.status(400).json({ msg: "This email does not exist." })

//         const access_token = createAccessToken({ id: user._id })
//         const url = `${CLIENT_URL}/user/reset/${access_token}`

//         sendMail(email, url, "Reset your password")
//         res.json({ msg: "Re-send the password, please check your email." })
//     } catch (err) {
//         return res.status(500).json({ msg: err.message })
//     }
// };

// export const resetPassword = async (req, res) => {
//     try {
//         const { password } = req.body
//         console.log(password)
//         const passwordHash = await bcrypt.hash(password, 12)

//         await InstructorModel.findOneAndUpdate({ _id: req.user.id }, {
//             password: passwordHash
//         })

//         res.json({ msg: "Password successfully changed!" })
//     } catch (err) {
//         return res.status(500).json({ msg: err.message })
//     }
// };