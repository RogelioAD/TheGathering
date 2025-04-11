import { Sequelize } from "sequelize";
import { User, UserFactory } from "./circleuser";
import { Chat, ChatFactory } from "./circlechat";
import { Group, GroupFactory } from "./circlegroup";
import { GroupMember, GroupMemberFactory } from "./circlegroupmembers";

const theGatheringdb = new Sequelize('thegathering', 'root', 'Password1!', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
});

UserFactory(theGatheringdb);
ChatFactory(theGatheringdb);
GroupFactory(theGatheringdb);
GroupMemberFactory(theGatheringdb);

User.belongsToMany(Group, {
    through: GroupMember,
    foreignKey: 'userId',
    onDelete: 'CASCADE',
});
Group.belongsToMany(User, {
    through: GroupMember,
    foreignKey: 'groupId',
    onDelete: 'CASCADE',
});

Chat.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
Chat.belongsTo(Group, { foreignKey: 'groupId', onDelete: 'CASCADE' });

User.hasMany(Chat, { foreignKey: 'userId', onDelete: 'CASCADE' });
Group.hasMany(Chat, { foreignKey: 'groupId', onDelete: 'CASCADE' });

export {
    theGatheringdb,
    User,
    Chat,
    Group,
    GroupMember
};
