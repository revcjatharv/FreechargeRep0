const express = require('express');
const router = express.Router();
const User = require('../models/user');


router.get("/users", function (req, res) {
  User.find().then(rec => {
    let data = null;
      if(req.refresh){
        const token = rec[0].generateJWT().token;
        const refreshToken =rec[0].generateJWT().refreshToken;
        data={data:rec, token, refreshToken}
        return res.status(200).json(data);
      }
      data={data:rec}
      return res.status(200).json(data);
      
  })
});
module.exports=router;
