import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { createServer as createHttpsServer } from 'https';
import { getConfig } from './config/config';
import { errorHandler } from './middlewares';
import { createInterviewRouter, example, resume } from './router';

dotenv.config();

const app = express();
const { port, isProductionEnv, httpsCert, httpsKey } = getConfig();

// Middlewares
app.use(cors());
app.use(express.json());
app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', '*');
    next();
});

// Routes
app.use('/example', example);
app.use('/resume', resume);
app.use('/interviews', createInterviewRouter());

app.use(errorHandler);

const serverToRun = isProductionEnv ? createHttpsServer({ key: httpsKey, cert: httpsCert }, app) : app;
serverToRun.listen(port, () => {
    console.log(`listening on port ${port} (${isProductionEnv ? 'https' : 'http'})`);
});
