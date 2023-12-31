const router = require('express').Router();
const { Users } = require('../models');
const withAuth = require('../utils/auth');

// view home splash page
router.get('/', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('splash', {
    title: 'Bug Bounty Brokers',
    style: 'splash.css'
  });
});

// view user dashboard page with user data
router.get('/dashboard', withAuth, async (req, res) => {
  console.log('ID OF USER: ' + req.session.user_id)
  try {
    const user = await Users.findByPk(req.session.user_id);
    console.log("USER: " + user);

    const userData = user.get({ plain: true });

    console.log("USER DATA: " + userData);

    res.render('dashboard', {
      userData,
      title: `${userData.username}'s Dashboard`,
      style: 'dashboard.css',
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// github repo search page
router.get('/bugs', withAuth, (req, res) => {
  res.render('bugs', {
    title: 'Search for Bugs',
    style: 'dashboard.css',
    logged_in: req.session.logged_in
  });
});

// view login page
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login', {
    title: 'User Login',
    style: 'login.css'
  });
});

// view sign up page
router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('signup', {
    title: 'Sign Up for BBB',
    style: 'signup.css'
  });
});

module.exports = router;
