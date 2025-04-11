import { Router } from "express";
import { addUserToGroup, getUsersInGroup, removeUserFromGroup } from "../controllers/groupMemberController";

const router = Router();

router.post('/', addUserToGroup);
router.get('/group/:groupId', getUsersInGroup);
router.delete('/:groupId/user/:userId', removeUserFromGroup);

export default router;