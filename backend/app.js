const express = require("express");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("./connection");
const Users = require("./models/users");
const app = express();
const PORT = process.env.PORT || 3000;

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
        res.status(200).json({ ...payload, token });
      }
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log("Server listening on port 3000");
});
