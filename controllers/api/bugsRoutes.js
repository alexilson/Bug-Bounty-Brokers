const router = require('express').Router();
const { Repos, Bugs } = require('../../models');

// Add a repo to the database
router.post('/', async (req, res) => {
    try {
        // Check if the bug (issue) already exists in the database
        const bugExist = await Bugs.findOne({
            where: {
                issue_url: req.body.issue_url
            }
        });

        // If the bug exists, send an "OK" response with bug id
        if (bugExist) {
            res.status(200).json({ id: bugExist.id, message: "Bug already exists in the database" });
        } else {
            // Find the repo id in the database based on repo_name
            const repoData = await Repos.findOne({
                where: {
                    repo_name: req.body.repo_name
                }
            });

            if (!repoData) {
                // Handle the case where the repo doesn't exist
                res.status(404).json({ message: "Repository not found" });
            } else {
                const repo = repoData.get({ plain: true });
                const repoId = repo.id;
                const newBugData = {
                    repo_id: repoId,
                    issue_title: req.body.issue_title,
                    issue_number: req.body.issue_number,
                    issue_state: req.body.issue_state,
                    issue_body: req.body.issue_body,
                    issue_url: req.body.issue_url,
                }

                const newBug = await Bugs.create(newBugData);
                res.status(201).json(newBug);
            }
        }
    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err });
    }
});

module.exports = router;
