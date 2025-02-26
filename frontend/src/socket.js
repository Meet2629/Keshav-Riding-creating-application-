const BASE_URL = process.env.VITE_BASE_URL || "http://localhost:4000";
const socket = new WebSocket(`${BASE_URL.replace(/^http/, 'ws')}/socket.io/?EIO=4&transport=websocket`);

socket.onopen = function(event) {
  console.log("WebSocket is open now.");
};

socket.onclose = function(event) {
  console.log("WebSocket is closed now.");
};

socket.onerror = function(error) {
  console.error("WebSocket error observed:", error);
};

export default socket;
