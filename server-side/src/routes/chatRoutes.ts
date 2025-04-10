import { Router } from 'express';
import { getAllChats, getOneChat, createChat, editChat, deleteChat } from '../controllers/chatController';

const router = Router();

router.get('/', getAllChats);
router.get('/:chatId', getOneChat);
router.post('/', createChat);
router.put('/:chatId', editChat);
router.delete('/:chatId', deleteChat);

export default router;