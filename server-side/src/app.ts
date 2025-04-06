import express, { NextFunction, Request, Response } from 'express';
import { theGatheringdb } from './models/db';
import { UserFactory } from './models/circleuser';
import { ChatFactory } from './models/circlechat';

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
// app.use('/api', chatRoutes);
// app.use('/api', userRoutes);

app.get('/test', (req, res) => {
    res.send('Test route works!');
});

// 404 error handling
app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).end();
});

theGatheringdb.sync({ force: true }) 
    .then(() => {
        console.info("Connected to the theGatheringdb and synced models!");
    })
    .catch((err) => {
        console.error("Error syncing database:", err);
    });

// Start server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
