import express from "express";
import { createFile, deleteFile, getFile, getUserFiles, saveFile } from "../controllers/fileController.js"

const router = express.Router();

router.post("/create", createFile);
router.get("/:id", getFile);
router.delete("/:id", deleteFile);
router.get("/user/:username", getUserFiles);
router.patch("/:id", saveFile)

export default router;