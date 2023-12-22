const router = require('express').Router();

// view home page with 
router.get('/', (req, res) => {
  const pageTitle = {
    title: "Bug Bounty Brokers"
  }
  res.render('splash', pageTitle)
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  const pageTitle = {
    title: "User Login"
  }
  res.render('login', pageTitle);
});

router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  const pageTitle = {
    title: "Sign Up for BBB"
  }
  res.render('signup');
});

module.exports = router;
