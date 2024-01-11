const router = require('express').Router();
const userRoutes = require('./userRoutes');
const searchRoutes = require('./searchRoutes')
const repoRoutes = require('./repoRoutes');
const bugsRoutes = require('./bugsRoutes')
const bountyRoutes = require('./bountyRoutes')

router.use('/users', userRoutes);
router.use('/search', searchRoutes);
router.use('/repo', repoRoutes);
router.use('/bugs', bugsRoutes);
router.use('/bounty', bountyRoutes);

module.exports = router;
