const express = require('express');
const router  = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
});
router.get('/ha',(req,res,next)=>{
  res.render('error');
});

module.exports = router;
