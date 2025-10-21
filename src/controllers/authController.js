import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const genToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn:'7d' });

export const register = async (req, res, next) => {
  try {
    const { name,email,password,department,year } = req.body;
    if (!name||!email||!password) throw new Error('Missing fields');
    const exists = await User.findOne({ email });
    if (exists) { res.status(400); throw new Error('User exists'); }
    const user = await User.create({ name,email,password,department,year });
    res.status(201).json({ token:genToken(user._id), user });
  } catch (err) { next(err); }
};

export const login = async (req, res, next) => {
  try {
    const { email,password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      res.status(401); throw new Error('Invalid credentials');
    }
    res.json({ token:genToken(user._id), user });
  } catch (err) { next(err); }
};
