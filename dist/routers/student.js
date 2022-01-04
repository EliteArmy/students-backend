"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Student_1 = __importDefault(require("../models/Student"));
const studentRouter = (0, express_1.Router)();
// //////////////////////////////////////////////
// Creating
// //////////////////////////////////////////////
studentRouter.post('/student', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const student = new Student_1.default(Object.assign({}, req.body));
    try {
        yield student.save();
        res.status(201).send(student);
    }
    catch (error) {
        res.status(400).send(error);
    }
}));
// //////////////////////////////////////////////
// Reading
// //////////////////////////////////////////////
// GET /student?limit=10&skip=0
// GET /student?sortBy=<createdAt_asc, createdAt_desc>
studentRouter.get('/student', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sort = {};
    // if (req.query.sortBy) {
    //   const parts = req.query.sortBy.split(':');
    //   sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
    // }
    try {
        const student = yield Student_1.default.find({
        // options: {
        //   limit: parseInt(req.query.limit), // mangoose ignores things other than numbers
        //   skip: parseInt(req.query.skip), // mangoose ignores things other than numbers
        //   sort,
        // },
        });
        res.send(student);
    }
    catch (error) {
        res.status(500).send({
            error,
            message: `something bad happend ${error.message}`,
        });
    }
}));
studentRouter.get('/student/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _id = req.params.id;
    try {
        const student = yield Student_1.default.findOne({ _id });
        // If no student was found
        if (!student) {
            return res.status(404).send();
        }
        res.send(student);
    }
    catch (error) {
        res.status(500).send({ error, message: 'something bad happend' });
    }
}));
// //////////////////////////////////////////////
// Update
// //////////////////////////////////////////////
studentRouter.patch('/student/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updates = Object.keys(req.body);
    const allowedUpdates = [
        'firstName',
        'lastName',
        'birthDate',
        'email',
        'address',
        'gender',
    ];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid field update' });
    }
    try {
        const student = yield Student_1.default.findOne({
            _id: req.params.id,
        });
        if (!student) {
            return res.status(404).send('Student Not found');
        }
        // updates.forEach(update => (student[update] = req.body[update]));
        yield student.save();
        res.send(student);
    }
    catch (error) {
        res.status(400).send(error);
    }
}));
// //////////////////////////////////////////////
// Delete
// //////////////////////////////////////////////
studentRouter.delete('/student/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const student = yield Student_1.default.findOneAndDelete({
            _id: req.params.id,
        });
        if (!student) {
            return res.status(404).send('Student not found');
        }
        res.send(student);
    }
    catch (error) {
        res.status(500).send({ error, message: 'something bad happend' });
    }
}));
exports.default = studentRouter;
//# sourceMappingURL=student.js.map