// @flow

import express from 'express';
import { ParseServer } from 'parse-server';
import ParseDashboard from 'parse-dashboard';
import path from 'path';

const SERVER_PORT = process.env.PORT || 8080;
const SERVER_HOST = process.env.HOST || 'localhost';
const APP_ID = process.env.APP_ID || 'cafeto-baas-app';
const MASTER_KEY = process.env.MASTER_KEY || 'Cafeto2010';
const DATABASE_URI = process.env.DATABASE_URI || 'mongodb://localhost:27017/dev';
const IS_DEVELOPMENT = process.env.NODE_ENV !== 'production';
const DASHBOARD_AUTH = process.env.DASHBOARD_AUTH;

const app: any = express();

const api: ParseServer = new ParseServer({
    databaseURI: DATABASE_URI,
    cloud: path.resolve(__dirname, 'cloud.js'),
    appId: APP_ID,
    masterKey: MASTER_KEY,
    fileKey: MASTER_KEY,
    serverURL: `http://${SERVER_HOST}:${SERVER_PORT}/api`,
    push: {
        android: {
            senderId: '805651505507',
            apiKey: 'AIzaSyAMsJM4UUaXzFR9ytRtzQZr6twOqOapZbw'
        }
    }
});

const dashboard: ParseDashboard = new ParseDashboard({
    "apps": [
        {
            appId: APP_ID,
            masterKey: MASTER_KEY,
            serverURL: `http://${SERVER_HOST}:${SERVER_PORT}/api`,
            appName: 'HeadsUp'
        }
    ]
}, );

app.use('/api', api);
app.use('/dashboard', dashboard);

app.listen(SERVER_PORT, () => console.log(
    `Server is now running in ${process.env.NODE_ENV || 'development'} mode on http://${SERVER_HOST}:${SERVER_PORT}`)
);