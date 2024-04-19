const express = require('express');

const dotenv = require('dotenv').config();

var cors = require('cors');

const errorHandler = require('./middleware/errorHandler');
const connectDb = require('./config/dbConnection');

connectDb();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: '*',
  })
);

app.use('/api/contacts', require('./routers/contactRoutes'));
app.use('/api/users', require('./routers/userRoutes'));
app.use(errorHandler);

app.listen(port, () => {
  console.log(`listen in port ${port}`);
});

module.exports = app;
