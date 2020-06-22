const winston = require('winston');
const express = require('express');
const config = require('./config')
const app = express();

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/debug')(app);

const PORT = process.env.PORT || config.port;
const server=app.listen(PORT, () => winston.info(`Listening Port ${PORT}`));
module.exports=server;
