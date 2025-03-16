const express = require ('express');
const app = express();
const dotenv=require('dotenv');
dotenv.config();
const cookieParser=require('cookie-parser')
const cors = require('cors');
const connectToDb = require('./db/db');

app.use(cors());
app.use(cookieParser())
const userRoutes=require('./routes/user.route.js');
connectToDb();

app.use(express.json())
app.use(express.urlencoded({extended:true}))



app.get('/', (req, res) => {
  res.send('Hello World');
});
app.use('/user',userRoutes);
// app.listen(3000,(req,res)=>{
//     console.log('Server is running on port 3000');
// });
module.exports = app;