"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
const schema = new mongoose_1.Schema({
    _id: { type: mongoose_1.Schema.Types.ObjectId },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    birthDate: { type: Date, default: Date.now, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator_1.default.isEmail(value)) {
                throw new Error('Email is not valid');
            }
        },
    },
    address: { type: String, required: true, trim: true },
    gender: { type: Boolean, required: true },
}, {
    timestamps: true,
});
const Student = (0, mongoose_1.model)('Studennt', schema);
exports.default = Student;
//# sourceMappingURL=Student.js.map