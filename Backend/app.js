const express = require ('express');
const app = express();
const dotenv=require('dotenv');
dotenv.config();
const cookieParser=require('cookie-parser')
const cors = require('cors');
const connectToDb = require('./db/db');
const mapsRoutes = require('./routes/maps.routes');
const rideRoutes = require('./routes/rides.routes');


app.use(cors());
app.use(cookieParser())
const userRoutes=require('./routes/user.route.js');
const captainRoutes=require('./routes/captain.route.js');
connectToDb();

app.use(express.json())
app.use(express.urlencoded({extended:true}))



app.get('/', (req, res) => {
  res.send('Hello World');
});
app.use('/user',userRoutes);
app.use('/captain',captainRoutes);
app.use('/maps',mapsRoutes);
app.use('/rides',rideRoutes);
// app.listen(3000,(req,res)=>{
//     console.log('Server is running on port 3000');
// });
module.exports = app;