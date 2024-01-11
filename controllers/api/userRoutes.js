// Leaving this in the repo for now as example code
const router = require('express').Router();
const { Users } = require('../../models');


// create new user
router.post('/', async (req, res) => {
  try {
    const userData = await Users.create(req.body);
    res
    // .status(200).json(userData)
    .render('login', {
      title: 'User Login',
      style: 'login.css'
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// login to check db if user and password match
router.post('/login', async (req, res) => {
  try {
    const userData = await Users.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

// logout and destroy session
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
