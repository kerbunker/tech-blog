async function loginFormHandler(event) {
  event.preventDefault();

  // gets the email and password given by the user
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    //calls the route to log the user in
    const response = await fetch('/api/users/login', {
      method: 'post',
      body: JSON.stringify({
        email,
        password
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      // sends logged in user to dahsboard
      document.location.replace('/dashboard/');
    } else {
      alert(response.statusText);
    }
  }
}


document.querySelector('.login-form').addEventListener('submit', loginFormHandler);