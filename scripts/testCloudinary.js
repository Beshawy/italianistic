const cloudinary = require("../utils/cloudinary");
const dotenv = require("dotenv");
dotenv.config();

console.log("Testing Cloudinary Config...");
console.log("Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);

cloudinary.uploader.ping((error, result) => {
  if (error) {
    console.error("Cloudinary Ping Failed:", error);
  } else {
    console.log("Cloudinary Ping Success:", result);
  }
  process.exit();
});
