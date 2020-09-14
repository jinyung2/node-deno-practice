const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const todoRoutes = require('./routes/todos');

app.use(bodyParser.json());

app.use(todoRoutes);

app.listen(3000);

