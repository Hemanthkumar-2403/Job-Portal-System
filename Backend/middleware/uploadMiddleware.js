// uploadMiddleware.js
const multer = require("multer");
const fs = require("fs");
const path = require("path");

// create storage that ensures folder exists
const createStorage = (folderName) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      // absolute path under project root
      const uploadPath = path.join(__dirname, "..", "uploads", folderName);

      // ensure folder exists
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }

      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const uniqueName = `${Date.now()}-${file.originalname}`;
      cb(null, uniqueName);
    },
  });

  return storage;
};

const imageFilter = (req, file, cb) => {
  const allowed = ["image/jpeg", "image/jpg", "image/png"];
  if (allowed.includes(file.mimetype)) cb(null, true);
  else cb(new Error("Only .jpeg, .jpg, .png files are allowed"), false);
};

const resumeFilter = (req, file, cb) => {
  const allowed = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];
  if (allowed.includes(file.mimetype)) cb(null, true);
  else cb(new Error("Only .pdf, .doc, .docx files are allowed"), false);
};

const uploadProfilePic = multer({
  storage: createStorage("profilePics"),
  fileFilter: imageFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
});

const uploadResume = multer({
  storage: createStorage("resumes"),
  fileFilter: resumeFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

module.exports = { uploadProfilePic, uploadResume };
