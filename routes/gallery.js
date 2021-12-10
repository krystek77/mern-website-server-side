import express from 'express';
import { addPhoto, getPhotos, updatePhoto } from '../controllers/gallery.js';

const router = express.Router();

router.post('/', addPhoto);
router.get('/', getPhotos);
router.patch('/:id', updatePhoto);

export default router;
