import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/cookieToken.js";
// import mongoose from "mongoose";

const signupUser = async(req, res) => {
	try {
		const { name, email, username, password } = req.body;
		const user = await User.findOne({ $or: [{ email }, { username }] });

		if (user) {
			return res.status(400).json({ error: "User already exists" });
		}
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newUser = new User({
			email,
			username,
			password: hashedPassword,
		});
		await newUser.save();

		if (newUser) {
			generateTokenAndSetCookie(newUser._id, res);

			res.status(201).json({
				_id: newUser._id,
				email: newUser.email,
				username: newUser.username,
			});
		} else {
			res.status(400).json({ error: "Invalid user data" });
		}
	} catch (err) {
		res.status(500).json({ error: err.message });
		console.log("Error in signupUser: ", err.message);
	}
};

const loginUser = async(req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        const isPassword = await bcrypt.compare(password, user?.password || "");

        if (!user || !isPassword) return res.status(400).json({ error: "Invalid username or password"} );

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
        });

    }
    catch (err) {
		res.status(500).json({ error: err.message });
		console.log("Error in loginUser: ", err.message);      
    }
};

const logoutUser = async(req, res) => {
    try {
        res.cookie("jwt", "", {maxAge:1});
        res.status(200).json({ message: "User logged out successfully" });
    } catch (err) {
		res.status(500).json({ error: err.message });
		console.log("Error in logoutUser: ", err.message);   
    }
};

export { signupUser, loginUser, logoutUser }