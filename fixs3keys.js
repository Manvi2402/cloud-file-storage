// fixS3Keys.js

const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "./server/.env") });

const mongoose = require("mongoose");
const File = require("./server/models/uploadModel"); // apne model ka exact naam/path lagao

console.log("Loaded MONGO_URI:", process.env.MONGO_URI);

if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI not found in .env file");
  process.exit(1);
}

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI,{
      serverSelectionTimeoutMS : 30000
    });
    console.log("✅ MongoDB connected");

    const files = await File.find({});
    console.log(`🔍 Found ${files.length} files`);

    let updatedCount = 0;

    for (let file of files) {
      if (!file.s3Key && file.s3Url) {
        file.s3Key = file.s3Url.split("/").pop();
        await file.save();
        updatedCount++;
        console.log(`🔑 Fixed: ${file.originalName}`);
      }
    }

    console.log(`🎉 Done! Updated ${updatedCount} files`);
    process.exit(0);
  } catch (err) {
    console.error("❌ Error fixing keys:", err);
    process.exit(1);
  }
})();

