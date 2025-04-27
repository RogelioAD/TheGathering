import { RequestHandler } from 'express';
import { GroupMember } from '../models/circlegroupmembers';
import { verifyUser } from '../services/auth';

export const addUserToGroup: RequestHandler = async (req, res) => {
    const user = await verifyUser(req);
    if (!user) return res.status(401).send("User not authenticated.");

    const { username, groupId } = req.body;

    if (!username || !groupId) {
        return res.status(400).json({ message: "username and groupId are required." });
    }

    try {
        const member = await GroupMember.create({ username, groupId });
        res.status(201).json(member);
    } catch (err) {
        console.error("Error adding user to group:", err);
        res.status(500).send(err);
    }
};

export const removeUserFromGroup: RequestHandler = async (req, res) => {
    const { username, groupId } = req.params;

    try {
        const deleted = await GroupMember.destroy({
            where: { username, groupId },
        });

        if (deleted) res.status(204).send();
        else res.status(404).send("Group member not found.");
    } catch (err) {
        res.status(500).send(err);
    }
};

export const getUsersInGroup: RequestHandler = async (req, res) => {
    const { groupId } = req.params;
    console.log("this getUsersInGroup is being called")
    try {
        const members = await GroupMember.findAll({
            where: { groupId },
        });
        res.status(200).json(members);
    } catch (err) {
        res.status(500).send(err);
    }
};
