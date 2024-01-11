const Bugs = require('./Bugs');
const FollowedRepos = require('./FollowedRepos');
const Repos = require('./Repos');
const Users = require('./Users');
const Bounties = require('./Bounties');

// Each repo has many bugs
Repos.hasMany(Bugs, {
  foreignKey: 'repo_id'
});

// Each bug has one repo
Bugs.belongsTo(Repos, {
  foreignKey: 'repo_id'
});

// FollowedRepos belongs to Users
Repos.belongsToMany(Users, {
  through: FollowedRepos
});

Users.belongsToMany(Repos, {
  through: FollowedRepos
});

// Each bounty has one bug
Bounties.belongsTo(Bugs, {
  foreignKey: 'bug_id'
});

// Each bug has many bounties
Bugs.hasMany(Bounties, {
  foreignKey: 'bug_id'
});

// Each bounty has one user
Bounties.belongsTo(Users, {
  foreignKey: 'user_id'
});

// Each user has many bounties
Users.hasMany(Bugs, {
  foreignKey: 'user_id'
});


module.exports = { Bugs, FollowedRepos, Repos, Users, Bounties };
