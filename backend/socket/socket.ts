import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000","http://172.245.220.221"],
        methods: ["GET", "POST"],
    },
});

const usersocketMap: Record<string, string> = {};

export const getReceiverSocketId = (receiverId: string): string | undefined => {
    return usersocketMap[receiverId];
};

io.on("connection", (socket) => {
    console.log("a user connected", socket.id);

    const userId = socket.handshake.query.userId as string;
    if (userId !== "undefined") usersocketMap[userId] = socket.id;
    io.emit("getOnlineUsers", Object.keys(usersocketMap));

    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);
        delete usersocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(usersocketMap));
    });
});

export { app, io, server };
