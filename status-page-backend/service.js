const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const serviceRoutes = require('./routes/serviceRoutes');
const authRoutes = require('./routes/authRoutes');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

mongoose.connect('mongodb://localhost:27017/status-page', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('MongoDB connection error: ', err));

app.use(cors());
app.use(express.json());
app.use('/api/services', serviceRoutes);
app.use('/api/auth', authRoutes);

// Real-time status updates via WebSocket
io.on('connection', (socket) => {
    console.log('New user connected');
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(5000, () => {
    console.log('Server is running on port 5000');
});
