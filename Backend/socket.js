const socketIo = require('socket.io');
const userModel = require('./models/user.model');
const captainModel = require('./models/captain.model');

let io;

function initializeSocket(server) {
    io = socketIo(server, {
        cors: {
            origin: process.env.FRONTEND_URL || "http://localhost:5173", // Ensure the URL is correctly set
            methods: ["GET", "POST"],
            credentials: true
        }
    });

    io.on('connection', (socket) => {
        console.log(`✅ Client connected: ${socket.id}`);

        socket.on('join', async (data) => {
            const { userId, userType } = data;

            if (!userId || !userType) {
                console.log("❌ Invalid join data:", data);
                return;
            }

            console.log(`🛜 ${userType} joined: ${userId} with socketId: ${socket.id}`);

            if (userType === 'user') {
                await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
            } else if (userType === 'captain') {
                await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
            }
        });

        socket.on('update-location-captain', async (data) => {
            const { userId, location } = data;

            if (!userId || !location?.lat || !location?.lng) {
                console.log("❌ Invalid location data:", data);
                return socket.emit('error', { message: 'Invalid location data' });
            }

            await captainModel.findByIdAndUpdate(userId, {
                location: {
                    lat: location.lat,
                    lng: location.lng
                }
            });

            console.log(`📍 Updated location for captain ${userId}:`, location);
        });

        socket.on('disconnect', async () => {
            console.log(`❌ Client disconnected: ${socket.id}`);

            const user = await userModel.findOneAndUpdate({ socketId: socket.id }, { $unset: { socketId: "" } });
            const captain = await captainModel.findOneAndUpdate({ socketId: socket.id }, { $unset: { socketId: "" } });

            if (user) {
                console.log(`🚨 Removed socketId for user ${user._id}`);
            }
            if (captain) {
                console.log(`🚨 Removed socketId for captain ${captain._id}`);
            }
        });
    });
}

const sendMessageToSocketId = (socketId, messageObject) => {
    if (!socketId) {
        console.log("❌ Cannot send message: socketId is missing.");
        return;
    }

    if (!messageObject?.event || !messageObject?.data) {
        console.log("❌ Invalid messageObject:", messageObject);
        return;
    }

    console.log(`📩 Sending '${messageObject.event}' to ${socketId}:`, messageObject.data);

    if (io) {
        io.to(socketId).emit(messageObject.event, messageObject.data);
    } else {
        console.log('❌ Socket.io is not initialized.');
    }
}

module.exports = { initializeSocket, sendMessageToSocketId };
