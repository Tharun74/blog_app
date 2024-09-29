const express = require('express')
const {handleSignup} = require('../controllers/user')
const router = express.Router();

router.get('/signin',(req,res)=>{
    res.render('signin');
})

router.get('/signup',(req,res)=>{
    res.render('signup');
})

router.post('/signup',handleSignup);

module.exports = router;