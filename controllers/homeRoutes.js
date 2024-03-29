const router = require('express').Router();
const { Users, Bounties, Bugs, Repos } = require('../models');
const sequelize = require('../config/connection');
const { Op } = require("sequelize");
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

    // get bounties that match the user's user_id
    const bountiesData = await Bugs.findAll({
      include: [
        {
          model: Repos,
          attributes: ['repo_name', 'repo_owner', 'repo_url']
        },
        {
          model: Bounties,
          where: {
            user_id: req.session.user_id
          },
          attributes: [], // tell sequelize we don't want any of the columns from the joined table Bounties
          as: 'bounties'
        }
      ],
      attributes: [
        'issue_title',
        'issue_state',
        'issue_url',
        'issue_body',
        'issue_number',
        [sequelize.fn('SUM', sequelize.col('bounties.bounty_amount')), 'bounty_total']
      ],
      group: ['bugs.id'],
      order: [['bounty_total', 'DESC']],
      subQuery: false
    })

    const bounties = bountiesData.map((bounty) => bounty.get({ plain: true }));

    res.render('dashboard', {
      userData,
      bounties,
      title: `${userData.username}'s Dashboard`,
      style: 'dashboard.css',
      logged_in: req.session.logged_in
    });

  } catch (err) {
    res.status(500).json(err);
    return;
  }
});

// github repo search page
router.get('/reposearch', withAuth, async (req, res) => {
  
  let repositories = [];
  // get search results stored in session storage
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
router.get('/issues', withAuth, async (req, res) => {
  let issues = [];
  // get issues stored in session storage
  issues = req.session.issues;

  const renderData = {
    title: 'Repo Issues',
    style: 'dashboard.css',
    logged_in: req.session.logged_in
  };
  
  if (issues) {
    const repo = issues[0].repo_name;
    const owner = issues[0].repo_owner;
    const url = issues[0].repo_url;

    // get all the issue urls into an array
    const urlArray = [];
    issues.forEach(issue => {
      if (issue.issue_url) {
        urlArray.push(issue.issue_url);
      }
    });
    
    // get all existing bounties
    const bountiesData = await Bugs.findAll({
      include: [
        {
          model: Bounties,
          attributes: [], // tell sequelize we don't want any of the columns from the joined table Bounties
          as: 'bounties'
        }
      ],
      where: {
        issue_url: {
          [Op.in]: urlArray
        }
      },
      attributes: [
        'issue_url',
        [sequelize.fn('SUM', sequelize.col('bounties.bounty_amount')), 'bounty_total']
      ],
      group: ['bugs.id', 'issue_url'],
      subQuery: false
    });

    const bounties = bountiesData.map((bounty) => bounty.get({ plain: true }));

    // add the bounty total to each matching issue
    issues.forEach(issue => {

      const urlMatch = bounties.find(bounty => bounty.issue_url === issue.issue_url);

      if (urlMatch) {
        issue.bounty_total  = urlMatch.bounty_total;
      }
    });

    renderData.issues = issues;
    renderData.owner = owner;
    renderData.repo = repo;
    renderData.url = url; 
  }

  res.render('issues', renderData);
});


// view most wanted top bounties
router.get('/bugs', withAuth, async (req, res) => {

  try {
    const bountyData = await Bugs.findAll({
      include: [
        {
          model: Repos,
          attributes: ['repo_name', 'repo_owner']
        },
        {
          model: Bounties,
          attributes: [], // tell sequelize we don't want any of the columns from the joined table Bounties
          as: 'bounties'
        }
      ],
      attributes: [
        'issue_title',
        'issue_state',
        'issue_url',
        'issue_body',
        'issue_number',
        [sequelize.fn('SUM', sequelize.col('bounties.bounty_amount')), 'bounty_total']
      ],
      group: ['bugs.id'],
      order: [['bounty_total', 'DESC']],
      limit: 10,
      subQuery: false
    })

    const bounties = bountyData.map((bounty) => bounty.get({ plain: true }));

    res.render('bugs', {
      bounties,
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
