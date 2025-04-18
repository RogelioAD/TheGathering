import { Router } from "express";
import { createGroup, getAllGroups, getGroupById, deleteGroup, getGroupsCreatedByUser, getGroupsUserIsIn } from "../controllers/groupController";

const router = Router();

router.post('/', createGroup);
router.get('/', getAllGroups);
router.get('/created/:username', getGroupsCreatedByUser)
router.get('/in/:username', getGroupsUserIsIn)
router.get('/group/:groupId', getGroupById);
router.delete('/group/:groupId', deleteGroup);

export default router;