import { Schema, Types, model } from 'mongoose';
import validator from 'validator';

export interface IStudent {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  birthDate: string;
  email: string;
  address: string;
  gender: boolean;
}

const schema = new Schema(
  {
    _id: { type: Schema.Types.ObjectId },
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

const Student = model<IStudent>('Student', schema);

schema.statics.build = (attr: IStudent) => {
  return new Student(attr)
}

export default Student;
