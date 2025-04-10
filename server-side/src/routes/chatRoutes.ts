import { Router } from 'express';
import { getAllChats, getOneChat, createChat, editChat, deleteChat } from '../controllers/chatController';

const router = Router();

router.get('/', getAllChats);
router.get('/:id', getOneChat);
router.post('/', createChat);
router.put('/:id', editChat);
router.delete('/:id', deleteChat);

export default router;