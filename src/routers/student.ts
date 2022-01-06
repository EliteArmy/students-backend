import { Request, Response, Router } from 'express';

import Student from '../models/Student';

const studentRouter = Router();

studentRouter.get('/', async (req: Request, res: Response) => {
  try {
    res.status(201).send('Hello!');
  } catch (error) {
    res.status(400).send(error);
  }
});

// //////////////////////////////////////////////
// Creating
// //////////////////////////////////////////////
studentRouter.post('/student', async (req: Request, res: Response) => {
  const student = new Student({
    ...req.body,
  });

  try {
    await student.save();
    res.status(201).send(student);
  } catch (error) {
    res.status(400).send(error);
  }
});

// //////////////////////////////////////////////
// Reading
// //////////////////////////////////////////////

// GET /student?limit=10&skip=0
// GET /student?sortBy=<createdAt_asc, createdAt_desc>
studentRouter.get('/student', async (req: Request, res: Response) => {
  // const sort = {};

  if (req.query.sortBy) {
    // const parts = req.query.sortBy.split(':');
    // sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
  }

  try {
    const student = await Student.find({
      options: {
        // limit: parseInt(req.query.limit), // mangoose ignores things other than numbers
        // skip: parseInt(req.query.skip), // mangoose ignores things other than numbers
        // sort,
      },
    });

    res.send(student);
  } catch (error) {
    res.status(500).send({
      error,
      message: `something bad happend ${error.message}`,
    });
  }
});

studentRouter.get('/student/:id', async (req: Request, res: Response) => {
  const _id = req.params.id;

  try {
    const student = await Student.findOne({ _id });

    // If no student was found
    if (!student) {
      return res.status(404).send();
    }

    res.send(student);
  } catch (error) {
    res.status(500).send({ error, message: 'something bad happend' });
  }
});

// //////////////////////////////////////////////
// Update
// //////////////////////////////////////////////
studentRouter.patch('/student/:id', async (req: Request, res: Response) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    'firstName',
    'lastName',
    'birthDate',
    'email',
    'address',
    'gender',
  ];

  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid field update' });
  }

  try {
    const student = await Student.findOne({
      _id: req.params.id,
    });

    if (!student) {
      return res.status(404).send('Student Not found');
    }

    // updates.forEach(update => (student[update] = req.body[update]));

    await student.save();

    res.send(student);
  } catch (error) {
    res.status(400).send(error);
  }
});

// //////////////////////////////////////////////
// Delete
// //////////////////////////////////////////////
studentRouter.delete('/student/:id', async (req: Request, res: Response) => {
  try {
    const student = await Student.findOneAndDelete({
      _id: req.params.id,
    });

    if (!student) {
      return res.status(404).send('Student not found');
    }

    res.send(student);
  } catch (error) {
    res.status(500).send({ error, message: 'something bad happend' });
  }
});

export default studentRouter;
