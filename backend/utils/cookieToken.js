import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
	const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
		expiresIn: "7d",
	});

	res.cookie("jwt", token, {
		httpOnly: true, // more secure, cannot be accessed by browser
		maxAge: 7 * 24 * 60 * 60 * 1000, // 15 days
		sameSite: "strict", // for CSRF attacks
	});

	return token;
};

export default generateTokenAndSetCookie;