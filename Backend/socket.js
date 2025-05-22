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
          console.log(`Updated socketId for user ${userId}`);
        } else if(userType=='captain'){
          await captainModel.findByIdAndUpdate(userId, {socketId: socket.id});
          console.log(`Updated socketId for captain ${userId}`);
          
          // Send test message to confirm socket is working
          setTimeout(() => {
            socket.emit('connection-test', { message: 'Your socket is working correctly' });
          }, 1000);
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

const sendMessageToSocketId = (socketId, messageObject) => {
  if (!io) {
    console.error('Socket IO not initialized when trying to send message');
    return false;
  }
  
  if (!socketId) {
    console.error('No socketId provided for message:', messageObject);
    return false;
  }
  
  // Get the socket by ID
  const socket = io.sockets.sockets.get(socketId);
  
  if (!socket) {
    console.error(`Socket with ID ${socketId} not found. Message not sent:`, messageObject);
    return false;
  }
  
  console.log(`Sending ${messageObject.event} to socket ${socketId}`);
  socket.emit(messageObject.event, messageObject.data);
  return true;
};

// Add a function to broadcast to all captains
const broadcastToCaptains = async (messageObject) => {
  if (!io) {
    console.error('Socket IO not initialized when trying to broadcast');
    return false;
  }
  
  try {
    const captains = await captainModel.find({ socketId: { $exists: true, $ne: null } });
    console.log(`Broadcasting to ${captains.length} captains`);
    
    captains.forEach(captain => {
      if (captain.socketId) {
        sendMessageToSocketId(captain.socketId, messageObject);
      }
    });
    
    return true;
  } catch (error) {
    console.error('Error broadcasting to captains:', error);
    return false;
  }
};

module.exports = {
  initializeSocket,
  sendMessageToSocketId,
  broadcastToCaptains
};
