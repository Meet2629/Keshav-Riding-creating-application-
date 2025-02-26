import socket from './socket';

// ...existing code...

socket.onmessage = function(event) {
  console.log("WebSocket message received:", event.data);
};

// ...existing code...