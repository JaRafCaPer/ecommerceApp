import multer from 'multer';
import path from 'path';
import __dirname from '../utils.js';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const { uid } = req.params;
        let uploadPath = '';

        if (file.fieldname === 'profile') {
            uploadPath = path.join(__dirname, `./uploads/profiles/`);
        } else if (file.fieldname === 'product') {
            uploadPath = path.join(__dirname, `./uploads/products/`);
        } else if (file.fieldname === 'dni') {
            uploadPath = path.join(__dirname, `./uploads/documents/dni`);
        } else if (file.fieldname === 'address') {
            uploadPath = path.join(__dirname, `./uploads/documents/address`);
        } else if (file.fieldname === 'state') {
            uploadPath = path.join(__dirname, `./uploads/documents/state`);
        } else {
            return cb(new Error('Unexpected fieldname'));
        }

        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${file.fieldname}-${uniqueSuffix}-${file.originalname}`);
    },
});

const uploadMiddleware = multer({ storage });

export default uploadMiddleware;