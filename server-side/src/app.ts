import express, { NextFunction, Request, Response } from 'express';
import { theGatheringdb } from './models/db'; 
import userRoutes from './routes/userRoutes';
import chatRoutes from './routes/chatRoutes';
import groupMemberRoutes from './routes/groupMemberRoutes';
import groupRoutes from './routes/groupRoutes';

const cors = require('cors');
const corsOptions = {
    origin: ['http://localhost:3000'],
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/chatapi', chatRoutes);
app.use('/userapi', userRoutes);
app.use('/groupsapi', groupRoutes);
app.use('/groupmembersapi', groupMemberRoutes);

app.get('/test', (req, res) => {
    res.send('Test route works!');
});

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).end();
});

theGatheringdb.sync({force:true})
    .then(() => {
        console.info("Connected to the theGatheringdb and synced models!");
    })
    .catch((err) => {
        console.error("Error syncing database:", err);
    });

app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});
