const router = require('express').Router();
const userRoutes = require('./userRoutes');
const searchRoutes = require('./searchRoutes')
// const projectRoutes = require('./projectRoutes');

router.use('/users', userRoutes);
router.use('/search', searchRoutes);
// router.use('/projects', projectRoutes);

module.exports = router;
