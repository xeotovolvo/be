import mongoose from 'mongoose';

const timetableSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  Date: {
    type: String,
    required: true,
  },
  Slot: {
    type: String,
    required: true,
  },
  Class: {
    type: Boolean,
    required: true,
  },
  Code: {
    type: String,
    required: true,
  },
  InstructorID:{
      type:String,
      require:true,
  }

}, { collection: 'Timetable' });

export const TimetableModel = mongoose.model('Timetable', timetableSchema);