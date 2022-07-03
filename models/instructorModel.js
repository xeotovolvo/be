import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    instructorID: {
        type: String,
    },
    role: {
        type: Number,
        default: 2
    },
    fullname: {
        type: String,
    },
    email: {
        type: String,
        required: [true, "Please enter your email!"],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please enter your password!"],
        trim: true
    },
    phone: {
        type: String,
        default: ""
    },
    image: {
        type: String,
        default: "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png"
    }
}, {
  collection: 'Instructor'
}
)
export const InstructorModel = mongoose.model('Instructor', schema);