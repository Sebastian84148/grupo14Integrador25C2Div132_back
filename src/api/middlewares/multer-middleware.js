import multer from "multer";
import path from "path";
import { randomUUID } from "crypto";
import {__dirname, join} from "../utils/index.js";

const storageConfig = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, join(__dirname, "src/public/img"));
    },
    filename: (req, file, callback) => {
        const ext = path.extname(file.originalname).toLowerCase();
        const nombreFichero = randomUUID() + ext;
        callback(null, nombreFichero);
    }
});

const fileFilterConfig = (req, file, callback) => {
    const tipos = ["image/png", "image/jpg", "image/webp", "image/jpeg"];
    const tipo = file.mimetype;

    if(tipos.includes(tipo)) {
        callback(null, true);
    } else {
        return callback(new Error('Formato no válido. Solo se permiten: JPG, PNG o WEBP'), false);
    }
}

export const handleMulterError = (err, req, res, next) => {
    if(err instanceof multer.MulterError) {
        return res.status(400).json({
            message: err.message
        });
    }
    if(err) {
        return res.status(400).json({
            message: err.message
        });
    }
    return res.status(500).json({
            message: err.message
        });
}

export const multerUploader = multer({
    storage: storageConfig,
    limits: { fileSize: 5 * 1024 * 1024},
    fileFilter: fileFilterConfig
});