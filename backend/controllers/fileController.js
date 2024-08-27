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

const saveFile = async (req, res) => {
    try {
        const { id } = req.params;  // Get fileId from request parameters
        const { title, text } = req.body;  // Get new title and text from request body

        // Find the file by its ID
        const file = await File.findById(id);
        if (!file) {
            return res.status(404).json({ error: "File not found" });
        }

        // Check if there are any changes in the title or text
        let isUpdated = false;

        if (title && title !== file.title) {
            file.title = title;
            isUpdated = true;
        }

        if (text && text !== file.text) {
            file.text = text;
            isUpdated = true;
        }

        // If there are changes, save the updated file
        if (isUpdated) {
            await file.save();
            return res.status(200).json({ message: "File updated successfully", file });
        } else {
            return res.status(200).json({ message: "No changes detected" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log(err);
    }
};

export { createFile, getFile, deleteFile, getUserFiles, saveFile }