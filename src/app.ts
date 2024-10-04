import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req: Request, res: Response) => {
res.json({"data": "This is Market Place Server"})
});

export default app;
