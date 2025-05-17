const socketIO = require('socket.io');
const userModel = require('./models/user.model.js');
const captainModel = require('./models/captain.model.js');

let io;

const initializeSocket = (server) => {
  io = socketIO(server, {
    cors: {
      origin: ["http://localhost:5173", "http://127.0.0.1:5173", "*"],
      methods: ["GET", "POST"],
      credentials: true,
      allowedHeaders: ["my-custom-header"]
    },
    transports: ['websocket', 'polling'],
    pingTimeout: 60000,
    connectTimeout: 60000
  });

  io.on('connection', (socket) => {
    console.log('New client connected with id: ', socket.id);

     io.on('join', async (data)=>{
    const {userId, userType} = data;

    if(userType=='user'){
        await userModel.findByIdAndUpdate(userId, {socketId: socket.id});
    }else if(userType=='captain'){
        await captainModel.findByIdAndUpdate(userId, {socketId: socket.id});
    }
  })
    
    socket.on('disconnect', () => {
      console.log('Client disconnected: ', socket.id);
    });

    socket.on('error', (error) => {
      console.error('Socket error:', error);
    });
  });

 

  io.engine.on("connection_error", (err) => {
    console.log('Connection error:', err.req, err.code, err.message, err.context);
  });

  return io;
};

const sendMessageToSocketId = (socketId, event, message) => {
  if (io) {
    io.to(socketId).emit(event, message);
    return true;
  }
  return false;
};

module.exports = {
  initializeSocket,
  sendMessageToSocketId
};
