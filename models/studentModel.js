import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    studentID: {
        type: String,
    },
    role: {
        type: Number,
        default: 3
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
        required: [true, "Please enter your password!"]
    },
    class: {
        type: String,
        default: ""
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
    collection: 'Student'
})

export const StudentModel = mongoose.model('Student', studentSchema);