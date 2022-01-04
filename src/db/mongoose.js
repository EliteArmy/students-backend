const mongoose = require('mongoose');

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch(error => {
    // tslint:disable-next-line:no-console
    console.log(error);
  });
