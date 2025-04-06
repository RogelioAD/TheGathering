import { Sequelize } from "sequelize";
import { UserFactory } from "./circleuser";
import { ChatFactory } from "./circlechat";

const theGatheringdb = new Sequelize('thegathering', 'root', 'Password1!', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});


// Initialize models
UserFactory(theGatheringdb);
ChatFactory(theGatheringdb);

export { theGatheringdb};
