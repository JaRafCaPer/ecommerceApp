import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const { uid } = req.params;
    let uploadPath = "";

    if (file.fieldname === "profile") {
      uploadPath = path.join(`uploads/${uid}/profiles/`);
    } else if (file.fieldname === "product") {
      uploadPath = path.join(`uploads/${uid}/products/`);
    } else if (file.fieldname === "dni") {
      uploadPath = path.join(`uploads/${uid}/dni`);
    } else if (file.fieldname === "address") {
      uploadPath = path.join(`uploads/${uid}/address`);
    } else if (file.fieldname === "state") {
      uploadPath = path.join(`uploads/${uid}/state`);
    } else {
      return cb(new Error("Unexpected fieldname"));
    }

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${file.fieldname}-${uniqueSuffix}-${file.originalname}`);
  },
});

const uploadMiddleware = multer({ storage, createParentPath: true });

export default uploadMiddleware;
