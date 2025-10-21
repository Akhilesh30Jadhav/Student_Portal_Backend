import express from 'express';
import { upload } from '../config/cloudinary.js'; // Import from config
// import your controller functions
import { uploadMaterial, getMaterials } from '../controllers/materialController.js';

const router = express.Router();

// Route to upload a material (PDF)
// 'file' is the field name in your form data
router.post('/upload', upload.single('file'), uploadMaterial);

// Route to get all materials
router.get('/', getMaterials);

export default router;
