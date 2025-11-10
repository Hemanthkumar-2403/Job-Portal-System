const multer = require("multer");
const path = require("path");

// 🔹 Dynamic storage generator for different upload types
const createStorage = (folderName) =>
  multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `uploads/${folderName}`); // store inside uploads/<folder>
    },
    filename: (req, file, cb) => {
      const uniqueName = `${Date.now()}-${file.originalname}`;
      cb(null, uniqueName);
    },
  });

// 🔹 File filters
const imageFilter = (req, file, cb) => {
  const allowed = ["image/jpeg", "image/jpg", "image/png"];
  if (allowed.includes(file.mimetype)) cb(null, true);
  else cb(new Error("❌ Only .jpeg, .jpg, .png files are allowed"), false);
};

const resumeFilter = (req, file, cb) => {
  const allowed = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ];
  if (allowed.includes(file.mimetype)) cb(null, true);
  else cb(new Error("❌ Only .pdf, .doc, .docx files are allowed"), false);
};

// 🔹 Create uploaders
const uploadProfilePic = multer({
  storage: createStorage("profilePics"),
  fileFilter: imageFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
});

const uploadResume = multer({
  storage: createStorage("resumes"),
  fileFilter: resumeFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

module.exports = { uploadProfilePic, uploadResume };
