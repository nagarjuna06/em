import multer from "multer";

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const checkFileType = function (req, file, cb) {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/i)) {
    return cb(new Error("Only jpg,png image types are accepted!"), false);
  }
  cb(null, true);
};

const upload = multer({
  storage,
  limits: { fileSize: 3500000 },
  fileFilter: checkFileType,
});

export default upload;
