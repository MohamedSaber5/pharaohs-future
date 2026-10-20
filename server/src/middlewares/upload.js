import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import AppError from "../utils/AppError.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure directories exist
const projectsDir = path.resolve(__dirname, "../../uploads/projects");
const unitsDir = path.resolve(__dirname, "../../uploads/units");

if (!fs.existsSync(projectsDir)) {
  fs.mkdirSync(projectsDir, { recursive: true });
}
if (!fs.existsSync(unitsDir)) {
  fs.mkdirSync(unitsDir, { recursive: true });
}

// Project Images Storage
const projectStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync(projectsDir)) {
      fs.mkdirSync(projectsDir, { recursive: true });
    }
    cb(null, projectsDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const cleanName = path
      .basename(file.originalname, ext)
      .replace(/[^a-zA-Z0-9_-]/g, "_")
      .slice(0, 30);
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e6)}`;
    cb(null, `project-${cleanName ? cleanName + "-" : ""}${unique}${ext}`);
  },
});

// Unit Images Storage
const unitStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync(unitsDir)) {
      fs.mkdirSync(unitsDir, { recursive: true });
    }
    cb(null, unitsDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const cleanName = path
      .basename(file.originalname, ext)
      .replace(/[^a-zA-Z0-9_-]/g, "_")
      .slice(0, 30);
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e6)}`;
    cb(null, `unit-${cleanName ? cleanName + "-" : ""}${unique}${ext}`);
  },
});

const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
const ALLOWED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp"];

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  const mime = file.mimetype.toLowerCase();

  if (ALLOWED_MIME_TYPES.includes(mime) && ALLOWED_EXTENSIONS.includes(ext)) {
    cb(null, true);
  } else {
    cb(new AppError("يسمح فقط برفع ملفات الصور بصيغة (JPG, PNG, WEBP)", 400), false);
  }
};

export const uploadProjectImages = multer({
  storage: projectStorage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
}).array("images", 15);

export const uploadUnitImages = multer({
  storage: unitStorage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
}).array("images", 15);
