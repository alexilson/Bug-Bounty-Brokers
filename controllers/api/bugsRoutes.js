const router = require('express').Router();
const { Repos, Bugs } = require('../../models');

// Add a repo to db
router.post('/', async (req, res) => {
    // Check if the repo already exists in the database
    const bugExist = await Bugs.findOne({
        where: {
            issue_url: req.body.issue_url
        }
    });
    if(bugExist){
            // If the bug exists, send an "OK" response
            res.status(200).json({ id: bugExist.id, message: "Bug already exists in the database" });
    } else {
        try {
            // get repo id from db
            const repoData = await Repos.findOne({
                where: {
                    repo_name: req.body.repo_name
                }
            });
    
            console.log(req.body.issueData)
    
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
            res.status(201).json(newBug)
        } catch (err) {
            res.status(400).json(err);
        }
    }
});

module.exports = router;
