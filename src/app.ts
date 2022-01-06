import express from 'express';
import cors from 'cors';

import { connect } from 'mongoose';

import studentRouter from './routers/student';

connect(process.env.MONGODB_URL, () => { console.log('connected to database') });

const app = express();

app.use(cors());

app.use(express.json());

app.use(studentRouter);

export default app;
