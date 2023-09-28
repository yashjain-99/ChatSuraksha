import express from "express";
import cors from "cors";
import socketIO from "./socket.js";
import userRoutes from "./routes/user.js";
import conversationRoutes from "./routes/conversation.js";
import authRoutes from "./routes/auth.js";
import { errorHandler } from "./middlewares/errorHandler.js"; // Import your errorHandler middleware here
import "./connection.js";

const app = express();
const PORT = process.env.PORT || 3000;
const socketServerPort = process.env.SOCKET_SERVER_PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Initialize Socket.IO
socketIO(socketServerPort);

// Mount route modules
app.use("/api/users", userRoutes);
app.use("/api/conversations", conversationRoutes);
app.use("/api/auth", authRoutes);

// Use the errorHandler middleware at the end
app.use(errorHandler);

// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
