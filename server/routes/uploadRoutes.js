const express = require("express");
const router = express.Router();
const upload = require("../middlewares/uploads");
const { uploadFileToS3 } = require("../utils/s3Upload");
const UploadedFile = require("../models/uploadModel"); // Your Mongoose model
const s3 = require("../utils/s3Upload"); // Make sure this is at the top

const { deleteFileFromS3 } = require("../utils/s3Delete");

router.delete("/:id", async (req, res) => {
  try {
    const file = await UploadedFile.findById(req.params.id);

    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }

    // Delete from S3
    await deleteFileFromS3(file.s3Key);

    // Delete from MongoDB
    await UploadedFile.findByIdAndDelete(req.params.id);

    res.json({ message: "File deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting file:", error);
    res.status(500).json({ error: "Failed to delete file" });
  }
});


// POST /api/upload
router.post("/", upload.single("file"), async (req, res) => {
  console.log("🧠 File info:", req.file);

  try {

    if (!req.file) {
      return res.status(400).json({
        error:"No file provided",
        details:"Please select a file before uploading.",
      })
    }

    // Upload to S3
    const s3Result = await uploadFileToS3(
      req.file.buffer,
      req.file.originalname,
      req.file.mimetype
    );

    // Save metadata to MongoDB
    const fileData = {
      originalName: req.file.originalname,
      size: req.file.size,
      mimetype: req.file.mimetype,
      s3Url: s3Result.Location, // S3 file URL
      s3Key: s3Result.Key 
    };

    const uploadedFile = new UploadedFile(fileData);
    await uploadedFile.save();

    res.status(201).json({
      message: "File uploaded & metadata saved",
      file: uploadedFile,
    });
  } catch (error) {
    console.error("🔥 Upload error:", error);
    res.status(500).json({ error: "Upload failed", details: error.message });
  }
});

// GET /api/upload — Fetch all uploaded file metadata
router.get("/", async (req, res) => {
  try {
    const files = await UploadedFile.find();
    res.json(files);
  } catch (err) {
    console.error("❌ Error in GET /api/upload:", err);
    res.status(500).json({ error: "Failed to fetch files" });
  }
});

module.exports = router;
