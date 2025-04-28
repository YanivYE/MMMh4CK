import multer, { FileFilterCallback } from "multer";
import { Request } from "express";
import { allowedFileTypes } from "../../../shared/types/types";

// 1 MB size limit
const MAX_SIZE = 1 * 1024 * 1024;

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (!allowedFileTypes.includes(file.mimetype)) {
    return cb(new Error("Only .jpeg, .jpg, .png, .webp files are allowed!"));
  }
  cb(null, true);
};

export const upload = multer({
  limits: { fileSize: MAX_SIZE },
  fileFilter,
  storage: multer.memoryStorage(),
});
