const Bugs = require('./Bugs');
const FollowedRepos = require('./FollowedRepos');
const Repos = require('./Repos');
const Users = require('./Users');

// Each bug has one repo
Bugs.belongsTo(Repos, {
  foreignKey: 'repo_id'
});

// 
Repos.hasMany(Bugs, {
  foreignKey: 'repo_id'
});

// FollowedRepos belongs to Users
Repos.belongsToMany(Users, {
  through: FollowedRepos
});

Users.belongsToMany(Repos, {
  through: FollowedRepos
});

module.exports = { Bugs, FollowedRepos, Repos, Users };
