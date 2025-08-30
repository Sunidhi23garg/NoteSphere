const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./src/utils/db");
const authRoutes = require("./src/routes/authRoutes");
const notesRoutes = require("./src/routes/notesRoutes");
const errorMiddleware = require("./src/middlewares/errorMiddleware");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());
app.use((req, res, next) => { 
  req.io = io; 
  next(); 
});

app.get("/", (_, res) => res.send("NoteSphere API running"));
app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);

app.use(errorMiddleware);

connectDB();

io.on("connection", (socket) => {
  console.log("⚡ Socket connected:", socket.id);
  socket.on("noteAdded", (data) => io.emit("noteAdded", data));
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));