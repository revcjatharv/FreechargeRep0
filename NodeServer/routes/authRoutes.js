const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post("/register", function (req, res) {
  const newUser = new User({
      name: req.body.fullname,
      email: req.body.email,
  });
  newUser.password = newUser.generateHash(req.body.password);
  newUser.save().then(rec => {
      res.send("User created successfully")
  }).catch(()=>{
    res.status(400).send('User already exists');
  })
});

router.post("/login", function (req, res) {
  User.findOne({ email: req.body.email }).then(loginUser => {
      if (!loginUser) {
          return res.status(401).json({ message: 'Invalud UserName or password' });
      }
      if (!loginUser.validatePassword(req.body.password)) {
          return res.status(401).json({ message: 'Invalud UserName or password' });
      }
      const withToken={email:loginUser.email,_id:loginUser._id};
      withToken.token=loginUser.generateJWT().token;
      withToken.refreshToken = loginUser.generateJWT().refreshToken
      res.status(200).json(withToken);
  }
  )
});
module.exports = router;
