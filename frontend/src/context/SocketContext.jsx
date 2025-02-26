import { createContext, useEffect } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext();

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:4000"; // Ensure fallback
console.log("Connecting to WebSocket at:", BASE_URL); // Debugging

const socket = io(BASE_URL, {
  transports: ["websocket", "polling"], // Ensure fallback support
  reconnectionAttempts: 5, // Retry connection
  reconnectionDelay: 2000, // Wait before retrying
});

const SocketProvider = ({ children }) => {
  useEffect(() => {
    const handleConnect = () => console.log("✅ Connected to WebSocket Server");
    const handleDisconnect = () => console.log("⚠️ Disconnected from WebSocket");
    const handleError = (err) => console.error("❌ WebSocket Error:", err);

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("connect_error", handleError);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("connect_error", handleError);
    };
  }, []);

  return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>;
};

export default SocketProvider;
