import { Request, Response } from "express";
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";
import { AI_BOT_ID } from "../constants/index.js";
import { generateGeminiResponse } from "../utils/gemini.js";

export const sendMessage = async (req: Request, res: Response): Promise<void> => {
    try {
        const { message } = req.body;
        const receiverIdParam = req.params.id;
        const receiverId = Array.isArray(receiverIdParam) ? receiverIdParam[0] : receiverIdParam;
        const senderId = req.user!._id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            });
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        });

        conversation.messages.push(newMessage._id);

        // If chatting with the Gemini AI bot, generate and save its reply too
        if (receiverId === AI_BOT_ID) {
            const aiReplyText = await generateGeminiResponse(message);

            const aiMessage = new Message({
                senderId: AI_BOT_ID,
                receiverId: senderId,
                message: aiReplyText,
            });

            conversation.messages.push(aiMessage._id);

            await Promise.all([conversation.save(), newMessage.save(), aiMessage.save()]);

            res.status(201).json([newMessage, aiMessage]);
            return;
        }

        await Promise.all([conversation.save(), newMessage.save()]);

        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.status(201).json(newMessage);
    } catch (error) {
        console.log("error in sendMessage controller:", (error as Error).message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getMessages = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user!._id;

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] },
        }).populate("messages");

        if (!conversation) {
            res.status(200).json([]);
            return;
        }

        const messages = conversation.messages;

        res.status(200).json(messages);
    } catch (error) {
        console.log("error in getMessages controller:", (error as Error).message);
        res.status(500).json({ error: "Internal server error" });
    }
};