document.querySelector('#search-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the form from submitting
  
    // Get the search term from the input field and trim whitespace
    const searchTerm = document.querySelector('#search').value.trim();
  
    console.log("Search Term: " + searchTerm);
  
    if (searchTerm) {
      try {
        const response = await fetch('/api/search', {
          method: 'POST',
          body: JSON.stringify({ searchTerm }),
          headers: { 'Content-Type': 'application/json' },
        });
  
        if (response.ok) {
          document.location.replace('/repoSearch');
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
  