const express = require('express');
const stackRoutes = require('./interfaces/routes/stackRoutes');
const kvStoreRoutes = require('./interfaces/routes/keyValueStoreRoutes');

const app = express();
app.use(express.json());

app.use('/stack', stackRoutes);
app.use('/kvstore', kvStoreRoutes);

module.exports = app;