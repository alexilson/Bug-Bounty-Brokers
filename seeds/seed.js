const sequelize = require('../config/connection');
const { Users, FollowedRepos, Repos, Bugs } = require('../models');

const userData = require('./usersData.json');
const bugsData = require('./bugsData.json');
const followedReposData = require('./followedReposData.json');
const reposData = require('./reposData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await Users.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const bugs = await Bugs.bulkCreate(bugsData, {
    individualHooks: true,
    returning: true
  })



  process.exit(0);
};

seedDatabase();
