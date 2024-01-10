const router = require('express').Router();
const userRoutes = require('./userRoutes');
const searchRoutes = require('./searchRoutes')
const repoRoutes = require('./repoRoutes');
const bugsRoutes = require('./bugsRoutes')

router.use('/users', userRoutes);
router.use('/search', searchRoutes);
router.use('/repo', repoRoutes);
router.use('/bugs', bugsRoutes);

module.exports = router;
