import express from 'express';
import stackRoutes from '../interfaces/routes/stackRoutes';
import kvStoreRoutes from '../interfaces/routes/keyValueStoreRoutes';

const app = express();
app.use(express.json());

app.use('/stack', stackRoutes);
app.use('/kvstore', kvStoreRoutes);

export const startServer = (port = 3000) => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
};

export default app;