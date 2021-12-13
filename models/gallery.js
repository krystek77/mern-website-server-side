import mongoose from 'mongoose';

const photoSchema = new mongoose.Schema({
  title: { type: String, trim: true },
  image: { type: String },
  rows: { type: Number },
  cols: { type: Number },
  equipment: { type: String, trim: true },
  createdAt: { type: Date, default: Date.now() },
  lastUpdated: { type: Date, default: null },
});
const Photo = mongoose.model('Photo', photoSchema);
export default Photo;
