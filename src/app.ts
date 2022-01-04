import express from 'express';
import cors from 'cors';
import { connect } from 'mongoose';

run().catch(err => {
  // tslint:disable-next-line:no-console
  console.log(err);
});

async function run(): Promise<void> {
  await connect(process.env.MONGODB_URL);
}

import studentRouter from './routers/student';

const app = express();

app.use(cors());

app.use(express.json());

app.use(studentRouter);

export default app;
