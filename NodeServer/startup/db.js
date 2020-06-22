const mongoose = require('mongoose');
const winston = require('winston');
const config = require('./config');

module.exports = function () {
  mongoose.connect(
    config.mongoURL,
    { useNewUrlParser: true }
).then(() => winston.info(`connected to mongodb ${config.mongoURL}`));;
}
