import mongoose from 'mongoose';

const photoSchema = new mongoose.Schema({
  title: { type: String, trim: true, default: '' },
  image: { type: String, default: '' },
  equipment: { type: String, trim: true, default: '' },
  createdAt: { type: Date, default: Date.now() },
  lastUpdated: { type: Date, default: null },
  doneAt: { type: Date, default: null },
});
const Photo = mongoose.model('Photo', photoSchema);
export default Photo;
