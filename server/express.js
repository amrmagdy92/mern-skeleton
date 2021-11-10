import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compress from 'compression';
import cookieParser from 'cookie-parser';
import path from 'path';

import devBundle from './devBundle';

import authRouter from './routes/auth.routes';
import userRouter from './routes/user.routes';
import template from '../template';

const CURRENT_WORKING_DIR = process.cwd();

const app = express();

// App configuration
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(helmet());
app.use(compress());
app.use(cors());
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, '/dist')));

devBundle.compile(app);

// Routes
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);

app.use((err, req, res, next) => {
    if (err.name == "UnauthorizedError") {
        res.status(401).json({"error": `${err.name}: ${err.message}`});
    } else if (err) {
        res.status(400).json({"error": `${err.name}: ${err.message}`});
        console.error(err);
    }
})

app.get('/', (req, res) => {
    res.setHeader('Content-Security-Policy', "script-src 'self' 'unsafe-eval'; base-uri 'self';");
    res.status(200).send(template());
});

export default app;