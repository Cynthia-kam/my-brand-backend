import express from 'express'
import commentController from '../controllers/commentController.js';

const router = express.Router();

router.post('/:id', commentController)
router.post('/', (req, res) => res.status(400).json({ message: "you must specify the blog to comment on.." }))

export default router