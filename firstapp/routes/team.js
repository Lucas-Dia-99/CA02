/*
    summary.js -- Router for the summary (group by category) page
*/
const express = require('express');
const router = express.Router();
const User = require('../models/User');

isLoggedIn = (req,res,next) => {
    if (res.locals.loggedIn) {
      next()
    } else {
      res.redirect('/login')
    }
}

router.get('/team', isLoggedIn, (req,res,next) => {
    res.render('team')
})

module.exports = router