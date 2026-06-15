import { Request, Response } from "express";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/genarateToken.js";

interface SignupBody {
    fullName: string;
    username: string;
    password: string;
    confirmPassword: string;
    gender: "male" | "female";
}

interface LoginBody {
    username: string;
    password: string;
}

export const signup = async (
    req: Request<{}, {}, SignupBody>,
    res: Response
): Promise<void> => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;

        if (password !== confirmPassword) {
            res.status(400).json({ error: "Password don't match" });
            return;
        }

        const user = await User.findOne({ username });
        if (user) {
            res.status(400).json({ error: "Username already exists" });
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const boyProfilePic = `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}&accessories=blank&top=shortHair`;
        const girlProfilePic = `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}&accessories=blank&top=longHair`;

        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
        });

        if (newUser) {
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic,
            });
        } else {
            res.status(500).json({ error: "Internal Server Error" });
        }
    } catch (error) {
        console.log("error in signup controller", (error as Error).message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const login = async (
    req: Request<{}, {}, LoginBody>,
    res: Response
): Promise<void> => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if (!user || !isPasswordCorrect) {
            res.status(400).json({ error: "Invalid username or password" });
            return;
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic,
        });
    } catch (error) {
        console.log("error in login controller", (error as Error).message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const logout = (req: Request, res: Response): void => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("error in logout controller", (error as Error).message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};