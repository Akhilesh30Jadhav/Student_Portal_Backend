import mongoose from 'mongoose';

const downloadSchema = new mongoose.Schema({
  user:{ type:mongoose.Schema.Types.ObjectId, ref:'User' },
  material:{ type:mongoose.Schema.Types.ObjectId, ref:'Material' }
}, { timestamps:true });

export default mongoose.model('Download', downloadSchema);
