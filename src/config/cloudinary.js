import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure Cloudinary Storage for Multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'student-portal-materials', // Folder name in Cloudinary
    allowed_formats: ['pdf', 'doc', 'docx', 'ppt', 'pptx'], // Allowed file types
    resource_type: 'raw' // Important for non-image files like PDFs
  }
});

// Create multer upload instance
export const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB file size limit
  }
});

// Export cloudinary instance
export default cloudinary;
