import cron from "node-cron";
import { postDailyVerse } from "../controllers/chatController";
import { Group } from "../models/circlegroup";

cron.schedule("0 9 * * *", async () => {
    console.log("Running daily verse job...");

    try {
        const groups: Group[] = await Group.findAll();


        for (const group of groups) {
            await postDailyVerse(group.groupId);
        }

        console.log("Daily verse sent to all groups.");
    } catch (error) {
        console.error("Error running daily verse job:", error);
    }
});
