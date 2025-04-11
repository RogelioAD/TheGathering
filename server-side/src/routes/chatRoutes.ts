import { Router } from 'express';
import { getAllChats, getOneChat, createChat, editChat, deleteChat, getChatsByGroup } from '../controllers/chatController';

const router = Router();

router.get('/', getAllChats);
router.get('/:chatId', getOneChat);
router.post('/', createChat);
router.put('/:chatId', editChat);
router.delete('/:chatId', deleteChat);
router.get('/group/:groupId', getChatsByGroup);

export default router;