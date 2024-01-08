document.addEventListener('DOMContentLoaded', function() {
    // Your JavaScript code here
    console.log("JavaScript code is running");


// Get all elements with the class "see-issues-button"
var seeIssuesButtons = document.querySelectorAll('.see-issues-button');

// Loop through each button and attach a click event listener
seeIssuesButtons.forEach(function(button) {
    button.addEventListener('click', async function(event) {
        event.preventDefault(); // Prevent the default link behavior
        console.log("BUTTON PUSHED");

        // Retrieve the data attributes from the button
        var repoName = button.getAttribute('data-repo-name');
        var owner = button.getAttribute('data-owner');

        console.log(repoName);
        console.log(owner);

        if (repoName && owner) {
            try {
              const response = await fetch('/api/search/issues', {
                method: 'POST',
                body: JSON.stringify({ repoName, owner }),
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