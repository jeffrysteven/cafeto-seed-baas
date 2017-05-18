// @flow

import express from 'express';
import { ParseServer } from 'parse-server';

const app = express();

const api = new ParseServer({
    databaseURI: 'mongodb://localhost:27017/cafetoTest',
    //cloud: '/home/myApp/cloud/main.js', // Absolute path to your Cloud Code
    appId: 'cafetobaas',
    masterKey: 'Cafeto2010', // Keep this key secret!
    fileKey: 'Cafeto2010',
    serverURL: 'http://localhost:1337/api'
});

app.use('/api', api);

app.listen(1337, () => console.log('Cafeto parse server running on port 1337.'));