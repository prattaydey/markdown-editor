import express from "express";
import { createFile, deleteFile, getFile, getUserFiles } from "../controllers/fileController.js"

const router = express.Router();

router.post("/create", createFile);
router.get("/:id", getFile);
router.delete("/:id", deleteFile);
router.get("/user/:username", getUserFiles);

export default router;