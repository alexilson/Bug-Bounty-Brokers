const router = require('express').Router();
const { Repos } = require('../../models');

// Add a repo to db
router.post('/', async (req, res) => {
    try {
        // Check if the repo already exists in the database
        const repoExist = await Repos.findOne({
            where: {
                repo_name: req.body.repo_name
            }
        });
        if (repoExist) {
            // If the repo exists, send an "OK" response
            res.status(200).json({ message: "Repository already exists in the database" });
        } else {
            // If the repo doesn't exist, add it to the database
            const newRepo = await Repos.create(req.body);
            res.status(201).json(newRepo);
        }
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;
