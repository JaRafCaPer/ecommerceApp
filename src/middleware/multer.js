import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const { uid, documentType } = req.params;
        let uploadPath = '';

        if (documentType === 'profile') {
            uploadPath = `uploads/profiles/${uid}`;
        } else if (documentType === 'product') {
            uploadPath = `uploads/products/${uid}`;
        } else if (documentType === 'document') {
            uploadPath = `uploads/documents/${uid}`;
        }

        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const uploadMiddleware = multer({ storage });

export default uploadMiddleware;