import mongoose from 'mongoose';

const materialSchema = new mongoose.Schema({
  title:String,
  description:String,
  subject:String,
  department:String,
  year:Number,
  category:String,
  file_url:String,
  tags:[String],
  downloads:{ type:Number, default:0 }
}, { timestamps:true });

export default mongoose.model('Material', materialSchema);
