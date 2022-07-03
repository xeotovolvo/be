import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
        StudentID: {
            type: String,
            required: true,
        },
        TimetableID: {
            type: String,
            required: true,
        },
        Status: {
            type: Boolean,
            required: true,
        },
        Datetime: {
            type: String,
            required: true,
        }
  },
  { timestamps: true }
);

export const AttendanceModel = mongoose.model('Attendance', schema);
