const router = require('express').Router();

// view home page with 
router.get('/', (req, res) => {
  res.render('splash')
});

// router.get('/login', (req, res) => {
//   if (req.session.logged_in) {
//     res.redirect('/');
//     return;
//   }
//   res.render('login');
// });

module.exports = router;
