import express, { NextFunction, Request, Response } from 'express';
import { theGatheringdb } from './models/db';
import { UserFactory } from './models/circleuser';
import { ChatFactory } from './models/circlechat';
import userRoutes from './routes/userRoutes';
import chatRoutes from './routes/chatRoutes';

const cors = require('cors');
const corsOptions = {
    origin: ['http://localhost:3000']
};

const app = express();
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize models
UserFactory(theGatheringdb);
ChatFactory(theGatheringdb);

// Routes
app.use('/chatapi', chatRoutes);
app.use('/userapi', userRoutes);

app.get('/test', (req, res) => {
    res.send('Test route works!');
});

// 404 error handling
app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).end();
});

theGatheringdb.sync() 
    .then(() => {
        console.info("Connected to the theGatheringdb and synced models!");
    })
    .catch((err) => {
        console.error("Error syncing database:", err);
    });

// Start server
app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});
