const socketIO = require('socket.io');
const userModel = require('./models/user.model.js');
const captainModel = require('./models/captain.model.js');

let io;

const initializeSocket = (server) => {
  io = socketIO(server, {
    cors: {
      origin: '*',
      methods: ["GET", "POST"],
    }
  });

  io.on('connection', (socket) => {
    console.log('New client connected with id: ', socket.id);

    // Handle join event
    socket.on('join', async (data) => {
     
        const {userId, userType} = data;
        console.log(`User ${userId} of type ${userType} joined with socket ${socket.id}`);

        if(userType=='user'){
          await userModel.findByIdAndUpdate(userId, {socketId: socket.id});
          console.log(`Updated socketId for user ${userId}`);
        } else if(userType=='captain'){
          await captainModel.findByIdAndUpdate(userId, {socketId: socket.id});
          console.log(`Updated socketId for captain ${userId}`);
          
          // Send test message to confirm socket is working
          // setTimeout(() => {
          //   socket.emit('connection-test', { message: 'Your socket is working correctly' });
          // // }, 1000);
        }
      
    });

    socket.on('update-location-captain', async (data) => {
        const { userId, location } = data;
        
        if(!location || !location.ltd || !location.lng){
          return socket.emit('error',{message: 'Invalid location data'})
        }
       
        await captainModel.findByIdAndUpdate(userId, { location:{
          ltd:location.ltd,
          lng:location.lng
        }}
      );
        socket.emit('location-update-success', { message: 'Location updated successfully' });
      
    });
    
    socket.on('disconnect', (reason) => {
      console.log('Client disconnected:', socket.id, 'Reason:', reason);
    });

    
  });

  

  // Handle server errors
  io.on('error', (error) => {
    console.error('Socket.IO server error:', error);
  });

  
};

const sendMessageToSocketId = (socketId, messageObject) => {
  console.log(messageObject);

  if(io){
    io.to(socketId).emit(messageObject.event, messageObject.data);
  } else {
    console.log('Socket.io is not initialized')
  }

};



module.exports = {
  initializeSocket, sendMessageToSocketId
};
