const express = require("express");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("./connection");
const Users = require("./models/users");
const Conversations = require("./models/conversations");
const app = express();
const PORT = process.env.PORT || 3000;
const io = require("socket.io")(3001, {
  cors: {
    origin: "http://localhost:1234",
  },
});
const connectedUsers = [];

io.on("connection", (socket) => {
  const socketId = socket.id;
  const userId = socket.handshake.query.userId;
  const fullName = socket.handshake.query.fullName;
  socket.on("addUser", (userId) => {
    console.log("adding user");
    const isUserAlreadyConnected = connectedUsers.find(
      (user) => user.userId === userId
    );
    if (!isUserAlreadyConnected) {
      connectedUsers.push({ userId, socketId, fullName });
    }
    console.log("connected users", connectedUsers);
    socket.on("disconnect", () => {
      const index = connectedUsers.findIndex((user) => user.userId === userId);
      connectedUsers.splice(index, 1);
      console.log("disconnected");
      console.log("connected users", connectedUsers);
    });
  });
  socket.on("sendMessage", ({ senderId, reciepientId, text }) => {
    const reciepientSocketId = connectedUsers.find(
      (user) => user.userId === reciepientId
    ).socketId;
    console.log("reciepient socket id", reciepientSocketId);
    socket.to(reciepientSocketId).emit("getMessage", {
      senderId,
      reciepientId,
      text,
      fullName,
    });
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/api/register", async (req, res) => {
  const { email, password, fullName, profilePicture } = req.body;
  if (!email || !password || !fullName)
    return res.status(400).json({ error: "All fields are required" });
  const alreadyExists = await Users.findOne({ email });
  if (alreadyExists)
    return res.status(400).json({ error: "Email already exists" });
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await Users.create({
      email,
      fullName,
      password: hashedPassword,
      profilePicture,
    });
    user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "All fields are required" });
  try {
    const user = await Users.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });
    const payload = {
      userId: user._id,
      email: user.email,
    };
    jwt.sign(
      payload,
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1d" },
      async (err, token) => {
        if (err) throw err;
        await Users.updateOne({ _id: user._id }, { $set: { token } });
        res.status(200).json({ ...payload, fullName: user.fullName, token });
      }
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/conversations", async (req, res) => {
  const { reciepientId, senderId, text } = req.body;
  if (!reciepientId || !senderId || !text)
    return res.status(400).json({ error: "All fields are required" });
  try {
    const conversation = await Conversations.create({
      reciepientId,
      senderId,
      text,
    });
    conversation.save();
    res.status(201).json({ message: "Conversation created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// get all conversation for a user
app.get("/api/conversations/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const conversations = await Conversations.find({
      $or: [{ reciepientId: userId }, { senderId: userId }],
    });
    //get user details for each conversation and add to the conversation object
    const conversationsWithUserDetails = await Promise.all(
      conversations.map(async (conversation) => {
        if (conversation.reciepientId === userId) {
          const user = await Users.findOne({ _id: conversation.senderId });
          return {
            ...conversation._doc,
            otherUserId: user._id,
            otherUserName: user.fullName,
            otherUserProfilePicture: user.profilePicture,
          };
        } else {
          const user = await Users.findOne({ _id: conversation.reciepientId });
          return {
            ...conversation._doc,
            otherUserId: user._id,
            otherUserName: user.fullName,
            otherUserProfilePicture: user.profilePicture,
          };
        }
      })
    );
    res.status(200).json({ conversationsWithUserDetails });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// get all users
app.get("/api/users", async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log("Server listening on port 3000");
});
