import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

import cookieParser from 'cookie-parser';

import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';
import connectDb from './config/db.js';

connectDb();

const app = express();

const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.status(200).send('Server is ready');
});

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

// Routes
app.use('/api/users', userRoutes);

// Custom middlewares
app.use(notFound);
app.use(errorHandler);



app.listen(port, () => console.log(`Server started on PORT: ${port}`));