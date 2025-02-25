import { createContext } from 'react';
import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:4000'; // Ensure the URL is correctly set

export const socket = io(SOCKET_URL, {
    withCredentials: true,
    transports: ['websocket', 'polling']
});

export const SocketContext = createContext();
