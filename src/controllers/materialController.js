import Material from '../models/Material.js';
import Download from '../models/Download.js';
import cloudinary from '../config/cloudinary.js';
import streamifier from 'streamifier';

export const uploadMaterial = async (req, res, next) => {
  try {
    const stream = cloudinary.uploader.upload_stream({ resource_type:'auto' }, (err, result) => {
      if (err) return next(err);
      res.status(201).json({ ...req.body, file_url:result.secure_url, downloads:0 });
    });
    streamifier.createReadStream(req.file.buffer).pipe(stream);
  } catch (err) { next(err); }
};

export const getMaterials = async (req, res, next) => {
  try {
    const materials = await Material.find().sort({ createdAt:-1 });
    res.json(materials);
  } catch (err) { next(err); }
};

export const searchMaterials = async (req, res, next) => {
  try {
    const { q, subject, department, year, category } = req.body;
    const criteria = { $and: [] };
    if (q) criteria.$and.push({ title: new RegExp(q,'i') });
    if (subject) criteria.$and.push({ subject });
    if (department) criteria.$and.push({ department });
    if (year) criteria.$and.push({ year });
    if (category) criteria.$and.push({ category });
    const results = await Material.find(criteria.$and.length ? criteria : {});
    res.json(results);
  } catch (err) { next(err); }
};

export const downloadMaterial = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Material.findByIdAndUpdate(id, { $inc: { downloads: 1 } });
    await Download.create({ user: req.user._id, material: id });
    res.redirect((await Material.findById(id)).file_url);
  } catch (err) { next(err); }
};
