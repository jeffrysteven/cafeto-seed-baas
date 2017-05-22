'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _parseServer = require('parse-server');

var _parseDashboard = require('parse-dashboard');

var _parseDashboard2 = _interopRequireDefault(_parseDashboard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express2.default)();

const api = new _parseServer.ParseServer({
    databaseURI: 'mongodb://localhost:27017/cafetoTest',
    //cloud: '/home/myApp/cloud/main.js', // Absolute path to your Cloud Code
    appId: 'cafetobaas',
    masterKey: 'Cafeto2010', // Keep this key secret!
    fileKey: 'Cafeto2010',
    serverURL: 'http://localhost:1337/api'
});

const dashboard = new _parseDashboard2.default({
    "apps": [{
        appId: 'cafetobaas',
        masterKey: 'Cafeto2010',
        serverURL: 'http://localhost:1337/api',
        appName: 'HeadsUp'
    }]
});

app.use('/api', api);
app.use('/dashboard', dashboard);

app.listen(1337, () => console.log('Cafeto parse server running on port 1337.'));