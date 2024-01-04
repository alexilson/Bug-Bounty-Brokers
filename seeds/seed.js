const sequelize = require('../config/connection');
const { Users, FollowedRepos, Repos, Bugs, Bounties } = require('../models');

const userData = require('./usersData.json');
const bugsData = require('./bugsData.json');
const followedReposData = require('./followedReposData.json');
const reposData = require('./reposData.json');
const bountiesData = require('./bountiesData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await Users.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const repos = await Repos.bulkCreate(reposData, {
    individualHooks: true,
    returning: true
  });

  const followedRepos = await FollowedRepos.bulkCreate(followedReposData, {
    individualHooks: true,
    returning: true
  });

  const bugs = await Bugs.bulkCreate(bugsData, {
    individualHooks: true,
    returning: true
  });

  const bounties = await Bounties.bulkCreate(bountiesData, {
    individualHooks: true,
    returning: true
  });

  process.exit(0);
};

seedDatabase();
