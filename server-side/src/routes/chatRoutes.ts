import { Router } from 'express';
import { getAllChats, getOneChat, createChat, editChat, deleteChat, getChatsByGroup, postDailyVerse, deleteChatsByGroup } from '../controllers/chatController';

const router = Router();

router.get('/', getAllChats);
router.get('/:chatId', getOneChat);
router.post('/', createChat);
router.put('/:chatId', editChat);
router.delete('/:chatId', deleteChat);

router.post('/dailyVerse/:groupId', postDailyVerse);
router.get('/group/:groupId', getChatsByGroup);
router.delete('/group/:groupId', deleteChatsByGroup);



export default router;