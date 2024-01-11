document.addEventListener('DOMContentLoaded', function () {
    // Get all elements with the id "create-bounty"
    var createBountyButton = document.querySelectorAll('#create-bounty');
    const repoDataEl = document.querySelector('.repo-data');

    // Loop through each button and attach a click event listener
    createBountyButton.forEach(function (button) {
        button.addEventListener('click', async function (event) {
            event.preventDefault(); // Prevent the default link behavior

            // Retrieve the data attributes from the repoDataEl element
            var repo_name = repoDataEl.getAttribute('data-repo-name');
            var repo_owner = repoDataEl.getAttribute('data-owner');
            var repo_url = repoDataEl.getAttribute('data-repo-url');

            // Retrieve issues data from the clicked button
            var issue_title = button.getAttribute('data-issue-title');
            var issue_number = button.getAttribute('data-issue-number');
            var issue_state = button.getAttribute('data-issue-state');
            var issue_body = button.getAttribute('data-issue-body');
            var issue_url = button.getAttribute('data-issue-url');

           // Select the "Add Bounty" input field and retrieve its value
            var bountyInput = button.closest('.card').querySelector('#bounty-input input');
            var bounty = bountyInput.value;


            console.log(repo_name);
            console.log(repo_owner);
            console.log(repo_url);
            console.log(issue_title);
            console.log(issue_number);
            console.log(issue_state);
            console.log(issue_body);
            console.log(issue_url);
            console.log(bounty); // Log the bounty value

            // Post to repos db
            if (repo_name && repo_owner && repo_url) {
                try {
                    const response = await fetch('/api/repo', {
                        method: 'POST',
                        body: JSON.stringify({ repo_name, repo_owner, repo_url }),
                        headers: { 'Content-Type': 'application/json' },
                    });
                    if (response.ok) {
                        // document.location.replace('/issues');
                    } else {
                        const errorText = await response.text();
                        console.error('Failed to post repo:', errorText);
                        alert('Failed to post bounty');
                    }
                } catch (error) {
                    console.error('An error occurred:', error);
                    alert('An error occurred while processing the request');
                }
            }

            var newBugId = ""
            // Post to bugs db
            if (issue_number && issue_state && issue_body && issue_url) {
                try {
                    const response = await fetch('/api/bugs', {
                        method: 'POST',
                        body: JSON.stringify({ repo_name, issue_title, issue_number, issue_state, issue_body, issue_url }),
                        headers: { 'Content-Type': 'application/json' },
                    });
                    if (response.ok) {
                        const newBugData = await response.json(); 
                        newBugId = newBugData.id;
                    } else {
                        const errorText = await response.text();
                        console.error('Failed to post issue', errorText);
                        alert('Failed to post issue');
                    }
                } catch (error) {
                    console.error('An error occurred:', error);
                    alert('An error occurred while processing the request');
                }
            }
            
            console.log("MADE IT TO BOUNTY CALL >>>>>>>>>>>>>>>>>>>>>>>>>>> " + newBugId)
             // Post to bounty 
             if (newBugId && bounty) {
                console.log(newBugId);
                try {
                    const response = await fetch('/api/bounty', {
                        method: 'POST',
                        body: JSON.stringify({ newBugId, bounty}),
                        headers: { 'Content-Type': 'application/json' },
                    });
                    if (response.ok) {
                     
                    } else {
                        const errorText = await response.text();
                        console.error('Failed to post bounty', errorText);
                        alert('Failed to post bounty');
                    }
                } catch (error) {
                    console.error('An error occurred:', error);
                    alert('An error occurred while processing the request');
                }
            }
        });
    });
});
