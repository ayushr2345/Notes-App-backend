// importing express and required modules
const express = require('express');
require("dotenv").config();
const cors = require('cors');
const app = express();
const PORT = 5000;
const { notesRouter } = require("./api/v1/index");
const req = require('express/lib/request');
require('./db');

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send("Hey")
});

app.use('/notes', notesRouter);



app.listen(PORT, () => {
    console.log(`Notes backend app running on port http://localhost:${PORT}`);
});