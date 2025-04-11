import { Sequelize } from 'sequelize';  
import { User, UserFactory } from './circleuser';
import { Chat, ChatFactory } from './circlechat';
import { Group, GroupFactory } from './circlegroup';
import { GroupMember, GroupMemberFactory } from './circlegroupmembers';

const theGatheringdb = new Sequelize('thegathering', 'root', 'Password1!', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
});

UserFactory(theGatheringdb);
GroupFactory(theGatheringdb);
ChatFactory(theGatheringdb);
GroupMemberFactory(theGatheringdb);

User.hasMany(Chat, { foreignKey: 'userId' });
Chat.belongsTo(User, { foreignKey: 'userId' });

Group.belongsToMany(User, { through: GroupMember, foreignKey: 'groupId' });
User.belongsToMany(Group, { through: GroupMember, foreignKey: 'userId' });

export { theGatheringdb, User, Chat, Group, GroupMember };
