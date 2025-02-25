import { io } from "socket.io-client";

const SOCKET_URL = "https://keshav-riding-creating-application.onrender.com"; 

const socket = io(SOCKET_URL, {
  transports: ["websocket", "polling"], // Enables fallback to polling if WebSockets fail
  reconnection: true,                   // Enable automatic reconnection
  reconnectionAttempts: 5,               // Try reconnecting 5 times
  reconnectionDelay: 5000,               // Wait 5 seconds between reconnect attempts
  withCredentials: true,                 // Helps with CORS issues if needed
});

export default socket;
