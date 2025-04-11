import { Router } from "express";
import { createGroup, getAllGroups, getGroupById, deleteGroup } from "../controllers/groupController";

const router = Router();

router.post('/', createGroup);
router.get('/', getAllGroups);
router.get('/:groupId', getGroupById);
router.delete('/:groupId', deleteGroup);

export default router;