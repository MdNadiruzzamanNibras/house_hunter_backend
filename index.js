const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const cors = require("cors")
const app = express();
const PORT = process.env.PORT || 5000;



app.get('/',(req, res)=> {
     res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});