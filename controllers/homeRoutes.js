const router = require('express').Router();
const { Users, Bounties, Bugs, FollowedRepos, Repos } = require('../models');
const sequelize = require('../config/connection');
const { Octokit } = require("@octokit/core");

const octokit = new Octokit({ 
  auth: process.env.API_KEY
});

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
  try {
    // get user data
    const user = await Users.findByPk(req.session.user_id);
    const userData = user.get({ plain: true });

    //get bounties
    const bountiesData =await Bounties.findAll({
      where: {user_id: req.session.user_id},
      include: [{
        model: Bugs,
        attributes: ['issue_title', 'issue_url']
      }]
    })
    const bounties = bountiesData.map((bounty) => bounty.get({ plain: true}))

    res.render('dashboard', {
      userData,
      bounties,
      title: `${userData.username}'s Dashboard`,
      style: 'dashboard.css',
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// followed repos
router.get('/feed', withAuth, async (req, res) => {
  try {
    // get user data
    const user = await Users.findByPk(req.session.user_id, {
      include: [{
        model: Repos,
        through: FollowedRepos
      }]
    });
    
    const userData = user.get({ plain: true });
    console.log(userData);

    res.render('feed', {
      userData,
      repos: userData.repos,
      title: 'Followed Repos',
      style: 'dashboard.css',
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
  
});

// github repo search page
router.get('/reposearch', withAuth, async (req, res) => {
  
  let repositories = [];
  repositories = req.session.repos;

  const renderData = {
    title: 'Search Repos',
    style: 'dashboard.css',
    logged_in: req.session.logged_in
  };
  
  if (repositories) {
    renderData.repositories = repositories; 
  }
  
  res.render('search', renderData);
});

// github issues after repo search
router.get('/issues', withAuth, (req, res) => {
  let issues = [];
  issues = req.session.issues;

  const renderData = {
    title: 'Repo Issues',
    style: 'dashboard.css',
    logged_in: req.session.logged_in
  };
  
  if (issues) {
    renderData.issues = issues; 
  }
  res.render('issues', renderData);
});

// most wanted top bounties
router.get('/bugs', withAuth, async (req, res) => {

  try {

    const bugs = await Bugs.findAll({
      include: [
        {
          model: Repos,
          attributes: ['repo_name'],
        },
        {
          model: Bounties,
          attributes: [], // tell sequelize we don't want any of the columns from the joined table Bounties
          as: 'bounties'
        }
      ],
      attributes: [
        'issue_title',
        [sequelize.fn('SUM', sequelize.col('bounties.bounty_amount')), 'bountyTotal']
      ],
      group: ['bugs.id'],
      order: [['bountyTotal', 'DESC']],
      limit: 10,
      subQuery: false
    })

    const bountiesData = bugs.map((bug) => bug.get({ plain: true }));

    res.render('bugs', {
      bountiesData,
      title: 'Search for Bugs',
      style: 'dashboard.css',
      logged_in: req.session.logged_in
    });

  } catch (err) {
    res.status(500).json(err);
    return;
  }
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
