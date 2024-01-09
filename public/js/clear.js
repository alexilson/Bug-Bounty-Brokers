
// clear repos
document.querySelector('#clear-repo-search').addEventListener('click', async function(event) {
    event.preventDefault(); // Prevent the form from submitting
    console.log("MADE IT TO CLICK")
    try {
        const response = await fetch('/api/search/clear', {
          method: 'POST',
          body: JSON.stringify({}),
          headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            document.location.replace('/repoSearch');
          } else {
            const errorText = await response.text();
            console.error('Failed to clear search:', errorText);
            alert('Failed to clear search');
          }
      } catch (error) {
        console.error('An error occurred:', error);
        alert('An error occurred while processing the request');
      }
});

// clear repos
document.querySelector('#clear-repo-search').addEventListener('click', async function(event) {
  event.preventDefault(); // Prevent the form from submitting
  console.log("MADE IT TO CLICK")
  try {
      const response = await fetch('/api/search/clear', {
        method: 'POST',
        body: JSON.stringify({}),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
          document.location.replace('/repoSearch');
        } else {
          const errorText = await response.text();
          console.error('Failed to clear search:', errorText);
          alert('Failed to clear search');
        }
    } catch (error) {
      console.error('An error occurred:', error);
      alert('An error occurred while processing the request');
    }
});
  