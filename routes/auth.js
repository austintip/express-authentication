const express = require('express');
const router = express.Router();
const db = require('../models');
const passport = require('../config/ppConfig');

// mounted at /auth

router.get('/signup', (req, res) => {
  res.render('auth/signup');
});

//Sign up POST route
router.post('/signup', (req, res) => {
  // findOrCreate a new user based on email
  db.user.findOrCreate({
    where: {
      email: req.body.email
    },
    defaults: {
      name: req.body.name,
      password: req.body.password
    }
  }).then(([user, created]) => {
    // If the user WAS created
      if (created) {
      //redirect to homepage or profile
      console.log(`${user.name} was created! 🤢`);
      passport.authenticate('local', {
        successRedirect: '/',
        successFlash: 'Successful account creation'
      })(req, res);
    } else { // else (user wasn't created - there is a user at that email)
        console.log(`${user.name} already exists!`);
        req.flash('error', 'email already exists');
        res.redirect('/auth/signup');
    //redirect to /auth/signup
    }
  }).catch(err => {
    console.log('Bad news bears, theres an error!');
    console.log(err);
    req.flash('error', err.message);
    // if there is an error it's probably a validation error, so we will return to /auth/signup
    res.redirect('/auth/signup');
  })
});

router.get('/login', (req, res) => {
  res.render('auth/login');
});

// make passport do the login stuff
router.post('/login', passport.authenticate('local', {
  failureRedirect: '/auth/login',
  successRedirect: '/',
  failureFlash: 'Invalid login credentials',
  successFlash: 'Successfully logged in'
}));

router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success', 'Thanks see ya soon!')
  res.redirect('/');
});
module.exports = router;
