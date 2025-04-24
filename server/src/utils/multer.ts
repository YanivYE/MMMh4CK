import multer, { FileFilterCallback } from "multer";
import { Request } from "express";

// Accept only these MIME types
const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

// 1 MB size limit
const MAX_SIZE = 1 * 1024 * 1024;

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error("Only .jpeg, .jpg, .png, .webp files are allowed!"));
  }
  cb(null, true);
};

export const upload = multer({
  limits: { fileSize: MAX_SIZE },
  fileFilter,
  storage: multer.memoryStorage(),
});
