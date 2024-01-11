const signupFormHandler = async (event) => {
    event.preventDefault();

    console.log("attemping to create new user");
  
    const email = document.querySelector('#email-signup').value.trim();
    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if (username && email && password) {
      const response = await fetch('/api/users/', {
        method: 'POST',
        body: JSON.stringify({ username, email, password}),
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (response.ok) {
        alert("New user created, you will be redirected to the login page.");
        document.location.replace('/login');
      } else {
        alert(response.statusText);
      }
    }
  }

console.log("==========> signup.js loaded")

document
.querySelector('.signup-form')
.addEventListener('submit', signupFormHandler);