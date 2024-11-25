import { Request, Response } from "express";
import { generateToken } from "../lib/utils";
import User from "../models/user.model";
import bcrypt from "bcryptjs";

export const signup = async (req: Request, res: Response): Promise<Response | void> => {
    const { fullName, email, password } = req.body;

    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({ msg: "Please enter all fields" });
        }

        if (password.length < 6) {
            return res.status(400).json({ msg: "Password must be at least 6 characters" });
        }

        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ msg: "Email already exists" });
        }

        // Hash password w/ bcryptjs
        const salt = await bcrypt.genSalt(10); // 10 is convention
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
        });

        if (newUser) {
            // Generate jwt token
            generateToken(newUser._id.toString(), res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            })

        } else {
            res.status(400).json({ msg: "User not created" });
        }

    } catch (error) {
        if (error instanceof Error) {
            console.log("Signup error: ", error.message);
            return res.status(500).json({ msg: "Internal Server error" });
        } else {
            console.log("Unexpected error: ", error);
            return res.status(500).json({ msg: "Unexpected error" });
        }
    }
};

export const login = (req: Request, res: Response) => {
    res.send("Login route");
};

export const logout = (req: Request, res: Response) => {
    res.send("Logout route");
};
