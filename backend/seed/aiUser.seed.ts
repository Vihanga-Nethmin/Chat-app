import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import connectToMongoDB from "../db/connectToMongoDB.js";
import { AI_BOT_ID } from "../constants/index.js";

dotenv.config();

const seedAIUser = async (): Promise<void> => {
    await connectToMongoDB();

    const existing = await User.findById(AI_BOT_ID);
    if (existing) {
        console.log("Gemini AI user already exists");
        await mongoose.connection.close();
        return;
    }

    const hashedPassword = await bcrypt.hash("gemini-ai-bot-1234", 10);

    await User.create({
        _id: AI_BOT_ID,
        fullName: "Gemini AI",
        username: "gemini-ai",
        password: hashedPassword,
        gender: "male",
        profilePic: "https://api.dicebear.com/7.x/bottts/svg?seed=gemini",
    });

    console.log("Gemini AI user created successfully");
    await mongoose.connection.close();
};

seedAIUser();