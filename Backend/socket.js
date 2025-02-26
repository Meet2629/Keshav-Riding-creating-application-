const socketIo = require('socket.io');
const userModel = require('./models/user.model');
const captainModel = require('./models/captain.model');

let io;

function initializeSocket(server) {
    io = socketIo(server, {
        cors: {
            origin: process.env.FRONTEND_URL || "http://localhost:5173",
            methods: ["GET", "POST"],
            credentials: true
        },
        transports: ["websocket"], // Force WebSocket-only (avoid polling delays)
        allowEIO3: true, // Ensure compatibility with older clients
    });

    io.on('connection', (socket) => {
        console.log(`✅ Client connected: ${socket.id}`);

        socket.on('join', async (data) => {
            try {
                const { userId, userType } = data;

                if (!userId || !userType) {
                    console.log("❌ Invalid join data:", data);
                    return socket.emit("error", { message: "Invalid join data" });
                }

                console.log(`🛜 ${userType} joined: ${userId} with socketId: ${socket.id}`);

                if (userType === 'user') {
                    await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
                } else if (userType === 'captain') {
                    await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
                }

                socket.emit("joined", { success: true, socketId: socket.id });

            } catch (error) {
                console.error("❌ Error in 'join' event:", error.message);
                socket.emit("error", { message: "Failed to join the WebSocket session." });
            }
        });

        socket.on('update-location-captain', async (data) => {
            try {
                const { userId, location } = data;

                if (!userId || !location?.lat || !location?.lng) {
                    console.log("❌ Invalid location data:", data);
                    return socket.emit('error', { message: 'Invalid location data' });
                }

                await captainModel.findByIdAndUpdate(userId, {
                    location: { lat: location.lat, lng: location.lng }
                });

                console.log(`📍 Updated location for captain ${userId}:`, location);

                // Emit update confirmation
                socket.emit("location-updated", { success: true, location });

            } catch (error) {
                console.error("❌ Error updating location:", error.message);
                socket.emit("error", { message: "Failed to update location." });
            }
        });

        socket.on('disconnect', async () => {
            console.log(`❌ Client disconnected: ${socket.id}`);

            try {
                const user = await userModel.findOneAndUpdate({ socketId: socket.id }, { $unset: { socketId: "" } });
                const captain = await captainModel.findOneAndUpdate({ socketId: socket.id }, { $unset: { socketId: "" } });

                if (user) {
                    console.log(`🚨 Removed socketId for user ${user._id}`);
                }
                if (captain) {
                    console.log(`🚨 Removed socketId for captain ${captain._id}`);
                }
            } catch (error) {
                console.error("❌ Error handling disconnect:", error.message);
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
