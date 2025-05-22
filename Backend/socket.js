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
    connectTimeout: 60000,
    maxHttpBufferSize: 1e8, // 100 MB
    path: '/socket.io'
  });

  io.on('connection', (socket) => {
    console.log('New client connected with id: ', socket.id);

    // Handle join event
    socket.on('join', async (data) => {
      try {
        const {userId, userType} = data;
        console.log(`User ${userId} of type ${userType} joined with socket ${socket.id}`);

        if(userType=='user'){
          await userModel.findByIdAndUpdate(userId, {socketId: socket.id});
        } else if(userType=='captain'){
          await captainModel.findByIdAndUpdate(userId, {socketId: socket.id});
        }
      } catch (error) {
        console.error('Error in join event:', error);
      }
    });

    socket.on('update-location-captain', async (data) => {
      try {
        const { userId, location } = data;
        
        // Validate location data
       
        

        // Check if latitude and longitude exist and are valid
       
        if(!location || !location.ltd || !location.lng){
          return socket.emit('error',{message: 'Invalid location data'})
        }
       
        await captainModel.findByIdAndUpdate(userId, { location:{
          ltd:location.ltd,
          lng:location.lng
        }}
      );
        socket.emit('location-update-success', { message: 'Location updated successfully' });
      } catch (error) {
        console.error('Error updating captain location:', error);
        socket.emit('location-update-error', { message: 'Server error updating location' });
      }
    });
    
    socket.on('disconnect', (reason) => {
      console.log('Client disconnected:', socket.id, 'Reason:', reason);
    });

    socket.on('error', (error) => {
      console.error('Socket error:', error);
    });
  });

  io.engine.on("connection_error", (err) => {
    console.log('Connection error:', err.code, err.message, err.context);
  });

  // Handle server errors
  io.on('error', (error) => {
    console.error('Socket.IO server error:', error);
  });

  return io;
};

const sendMessageToSocketId = (socketId, messageObject )=> {
  if (io) {
    io.to(socketId).emit(messageObject.event, messageObject.data);
    return true;
  }
  return false;
};

module.exports = {
  initializeSocket,
  sendMessageToSocketId
};
