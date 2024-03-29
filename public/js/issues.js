document.addEventListener('DOMContentLoaded', function() {

// Get all elements with the class "see-issues-button"
var seeIssuesButtons = document.querySelectorAll('.see-issues-button');

// Loop through each button and attach a click event listener
seeIssuesButtons.forEach(function(button) {
    button.addEventListener('click', async function(event) {
        event.preventDefault(); // Prevent the default link behavior

        // Retrieve the data attributes from the button
        var repoName = button.getAttribute('data-repo-name');
        var owner = button.getAttribute('data-owner');
        var url = button.getAttribute('data-repo-url');

        console.log("IN issues.js")
        console.log(repoName);
        console.log(owner);
        console.log(url);

        if (repoName && owner && url) {
            try {
              const response = await fetch('/api/search/issues', {
                method: 'POST',
                body: JSON.stringify({ repoName, owner, url }),
                headers: { 'Content-Type': 'application/json' },
              });
        
              if (response.ok) {
                document.location.replace('/issues');
              } else {
                const errorText = await response.text();
                console.error('Failed to search repo:', errorText);
                alert('Failed to search repo');
              }
            } catch (error) {
              console.error('An error occurred:', error);
              alert('An error occurred while processing the request');
            }
          }
    });
});

});