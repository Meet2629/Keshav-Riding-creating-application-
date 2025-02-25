import { io } from "socket.io-client";

// Define the base URL for the socket connection
const SOCKET_URL = "https://keshav-riding-creating-application.onrender.com"; // Replace with your actual server URL

// Initialize the socket connection
const socket = io(SOCKET_URL);

export default socket;
