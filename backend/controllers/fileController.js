import File from "../models/fileModel.js";
import User from "../models/userModel.js";

const createFile = async (req, res) => {
    try {
		const { postedBy } = req.body;
		let { title, text } = req.body;

		if (!postedBy) {
			return res.status(400).json({ error: "Postedby field is required" });
		}

		const user = await User.findById(postedBy);
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		const newFile = new File({
            postedBy,
            title: title || "Untitled.md",
            text: text || ""
        });
		await newFile.save();

        user.files.push(newFile._id);

        await user.save();

		res.status(201).json(newFile);
	} catch (err) {
		res.status(500).json({ error: err.message });
		console.log(err);
	}
}

const getFile = async (req, res) => {
	try {
		const file = await File.findById(req.params.id);

		if (!file) {
			return res.status(404).json({ error: "File not found" });
		}

		res.status(200).json(file);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const deleteFile = async (req, res) => {
	try {
		const file = await File.findById(req.params.id);
		if (!file) {
			return res.status(404).json({ error: "File not found" });
		}

		const user = await User.findById(file.postedBy);
		
		if (!user) {
			return res.status(404).json({ error: "User not found"} );
		}

		user.files = user.files.filter(f => f.toString() !== req.params.id);
		await user.save()
		
		await File.findByIdAndDelete(req.params.id);

		res.status(200).json({ message: "File deleted successfully" });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const getUserFiles = async (req, res) => {
	const { username } = req.params;
	try {
		const user = await User.findOne({ username });
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		const files = await File.find({ postedBy: user._id }).sort({ createdAt: -1 });

		res.status(200).json(files);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export { createFile, getFile, deleteFile, getUserFiles }