import { RequestHandler } from 'express';
import { GroupMember } from '../models/circlegroupmembers';
import { verifyUser } from '../services/auth';

export const addUserToGroup: RequestHandler = async (req, res) => {
    const user = await verifyUser(req);
    if (!user) return res.status(401).send("User not authenticated.");

    const { userId, groupId } = req.body;

    if (!userId || !groupId) {
        return res.status(400).json({ message: "userId and groupId are required." });
    }

    try {
        const member = await GroupMember.create({ userId, groupId });
        res.status(201).json(member);
    } catch (err) {
        console.error("Error adding user to group:", err);
        res.status(500).send(err);
    }
};

export const removeUserFromGroup: RequestHandler = async (req, res) => {
    const { userId, groupId } = req.params;

    try {
        const deleted = await GroupMember.destroy({
            where: { userId, groupId },
        });

        if (deleted) res.status(204).send();
        else res.status(404).send("Group member not found.");
    } catch (err) {
        res.status(500).send(err);
    }
};

export const getUsersInGroup: RequestHandler = async (req, res) => {
    const { groupId } = req.params;

    try {
        const members = await GroupMember.findAll({
            where: { groupId },
        });
        res.status(200).json(members);
    } catch (err) {
        res.status(500).send(err);
    }
};
