const multer = require("multer");

// 1️⃣ Configure where to store files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // folder where files will go
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // unique filename
  },
});

// 2️⃣ Allow only certain file types (images + pdf)
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "application/pdf",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // ✅ File type allowed
  } else {
    cb(new Error("❌ Only .jpeg, .jpg, .png, and .pdf files are allowed"), false);
  }
};

// 3️⃣ Create multer upload instance
const upload = multer({ storage, fileFilter });

module.exports = {upload}
