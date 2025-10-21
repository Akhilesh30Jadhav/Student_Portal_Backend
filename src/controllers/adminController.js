import User from '../models/User.js';
import Download from '../models/Download.js';

export const getUsers = async (req, res, next) => {
  try {
    res.json(await User.find());
  } catch (err) { next(err); }
};

export const updateUserRole = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    await User.findByIdAndUpdate(id, { role });
    res.json({ success:true });
  } catch (err) { next(err); }
};

export const stats = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalMaterials = await Download.countDocuments();
    res.json({ totalUsers, totalMaterials });
  } catch (err) { next(err); }
};
