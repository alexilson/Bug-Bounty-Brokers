const router = require('express').Router();
const { Bugs, Bounties} = require('../../models');

// Add a bounty to db
router.post('/', async (req, res) => {
  try {
      const newBountyData = {
        bug_id: req.body.newBugId,
        user_id: req.session.user_id,
        bounty_amount: req.body.bounty
      }
      // If the repo doesn't exist, add it to the database
      const newBounty = await Bounties.create(newBountyData);
      res.status(201).json(newBounty);
  
  } catch (err) {
      res.status(400).json(err);
  }
});

module.exports = router;
