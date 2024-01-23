const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken')
const userRouter = require("./user/userRouter")
const cors = require("cors")
const app = express();
const PORT = process.env.PORT || 5000;




// middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(userRouter)
// connection database
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fympfvv.mongodb.net/houseHunter?retryWrites=true&w=majority`

// connectDB is a function that connect mongodb database
async function connectDB () {
    try{
      await mongoose.connect(uri)
      console.log("connect db");
    }
    catch{
        console.error('Error connecting to MongoDB:', error);
    }
}
connectDB();

app.get('/',(req, res)=> {
     res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});