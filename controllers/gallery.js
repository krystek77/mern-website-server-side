import Photo from '../models/gallery.js';
import mongoose from 'mongoose';

export const getPhotos = async (req, res) => {
  const LIMIT = 14;
  try {
    const photos = await Photo.find({}, '-__V')
      .sort({ createdAt: 'desc' })
      .limit(LIMIT);
    return res.status(200).json(photos);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};
export const addPhoto = async (req, res) => {
  const photo = req.body;

  const newPhoto = new Photo(photo); //_id, title,image,rows,cols,createdAt:Date,now()
  try {
    await newPhoto.save();
    return res.status(201).json(newPhoto);
  } catch (error) {
    return res.status(409).json({ message: error.message });
  }
};

export const updatePhoto = async (req, res) => {
  const { id: _id } = req.params;
  const photo = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).json({ message: 'No photo with that id' });
  try {
    photo.lastUpdated = Date.now();
    const updatedPhoto = await Photo.findByIdAndUpdate(_id, photo, {
      new: true,
    }).select("-__v")
    return res.status(200).json(updatedPhoto);
  } catch (error) {
    return res.status(409).json({ message: error.message });
  }
};
