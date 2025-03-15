const express = require ('express');
const app = express();
const dotenv=require('dotenv');
dotenv.config();
const cors = require('cors');
const connectToDb = require('./db/db');
app.use(cors());

connectToDb();

app.get('/', (req, res) => {
  res.send('Hello World');
});

// app.listen(3000,(req,res)=>{
//     console.log('Server is running on port 3000');
// });
module.exports = app;