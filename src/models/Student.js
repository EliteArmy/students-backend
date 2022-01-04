import mongoose from 'mongoose';
import validator from 'validator';

const studentSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    birthDate: { type: Date, default: Date.now, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value: string) {
        if (!validator.isEmail(value)) {
          throw new Error('Email is not valid');
        }
      },
    },
    address: { type: String, required: true, trim: true },
    gender: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

// We define the model
const Student = mongoose.model('Student', studentSchema);

export default Student;
