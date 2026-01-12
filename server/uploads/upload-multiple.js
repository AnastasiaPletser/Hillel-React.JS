import multer from "multer";
import express from "express";
import path from "path";
import fs from "fs";

const router = express.Router();
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

router.post("/upload-multiple", upload.array("files", 10), (req, res) => {
  const urls = req.files.map(file => `http://localhost:5001/uploads/${file.filename}`);
  res.json(urls);
});

export default router;
