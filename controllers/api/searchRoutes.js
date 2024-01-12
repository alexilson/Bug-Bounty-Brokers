const router = require('express').Router();
const { Octokit } = require("@octokit/core");

const octokit = new Octokit({ 
  auth: process.env.API_KEY
});

// github repo search page
router.post('/', async (req, res) => {
    let returnedRepos = [];
    const query = req.body.searchTerm;

    try {
        const response = await octokit.request("GET /search/repositories", {
          q: query,
          page: 1, // Replace with the desired page number
          per_page: 200, // Replace with the desired number of results per page
          sort: "stars", // Replace with your preferred sorting criteria
          order: "desc" // Replace with "asc" for ascending order or "desc" for descending order
        });
    
        // Extract the list of repositories from the response
        const repositories = response.data.items;
        
        // Loop through the repositories and display their information
        repositories.forEach(repository => {
          returnedRepos.push({
            name: repository.name,
            owner: repository.owner.login,
            description: repository.description,
            url: repository.url
          });
        });

        // Store the repositories in the user's session
        req.session.save(() => {
            req.session.repos = returnedRepos;
            // Return the repositories as a response
            res.json({ repositories: returnedRepos });
        })
   
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


// github issues search
router.post('/issues', async (req, res) => {
    let returnedIssues = [];
    
    const owner = req.body.owner;
    const repo = req.body.repoName;
    const url = req.body.url;
    
    try {
        const response = await octokit.request(`GET /repos/${owner}/${repo}/issues`);
    
        // Extract the list of repositories from the response
        const issues = response.data;
      
        // Loop through the repositories and display their information
        issues.forEach(issue => {
          returnedIssues.push({
            repo_owner: owner,
            repo_name: repo,
            repo_url: url,
            issue_number: issue.number,
            issue_state: issue.state,
            issue_title: issue.title,
            issue_body: issue.body,
            issue_url: issue.html_url,
          });
        });

        // Store the repositories in the user's session
        await req.session.save(() => {
            req.session.issues = returnedIssues;
            // Return the repositories as a response
            res.json({ issues: returnedIssues });
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// github clear session storage
router.post('/clear', async (req, res) => {
  delete req.session.repos;
  delete req.session.issues;
  await req.session.save(); 
  res.json({ message: 'Repository data removed' });
});


module.exports = router;
