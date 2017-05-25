/* @flow */

import bodyParser from 'body-parser';
import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import Parse from 'parse/node';
import ParseDashboard from 'parse-dashboard';
import { ParseServer } from 'parse-server';
import path from 'path';
import { Schema } from './schema/schema';

const SERVER_PORT: string = process.env.PORT || '8080';
const SERVER_HOST: string = process.env.HOST || 'localhost';
const APP_ID: string = process.env.APP_ID || 'cafeto-baas-app';
const MASTER_KEY: string = process.env.MASTER_KEY || 'Cafeto2010';
const DATABASE_URI: string = process.env.DATABASE_URI || 'mongodb://localhost:27017/dev';
const IS_DEVELOPMENT: boolean = process.env.NODE_ENV !== 'production';
const DASHBOARD_AUTH: string = process.env.DASHBOARD_AUTH || '';

Parse.initialize(APP_ID, APP_ID, MASTER_KEY);

const app: express = express();

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
    apps: [
        {
            appId: APP_ID,
            masterKey: MASTER_KEY,
            serverURL: `http://${SERVER_HOST}:${SERVER_PORT}/api`,
            appName: 'XXXX'
        }
    ]
});

function getSchema() {
    if (!IS_DEVELOPMENT) {
        return Schema;
    }
    delete require.cache[require.resolve('./schema/schema.js')];
    return require('./schema/schema.js').Schema;
}

app.use('/api', api);
app.use('/dashboard', dashboard);
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema: getSchema() }));
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

app.listen(SERVER_PORT, console.log(`Server is now running in ${process.env.NODE_ENV || 'development'} mode on http://${SERVER_HOST}:${SERVER_PORT}`));
