const express = require('express');
const helmet = require('helmet');
const auth = require('../routes/authRoutes');
const user = require('../routes/userRoutes');
const defaultRoute = require('../routes/defaultRoutes');
const error = require('../middleware/error');
const authenticate = require('../middleware/authenticate');
const path = require('path');

module.exports = function (app) {
  app.use(express.static(path.join(__dirname, "../../dist")));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(helmet());
  app.use('/api/user/',authenticate, user);
  app.use('', defaultRoute);
  app.use('/api/auth/', auth);
  app.use(error);
}
