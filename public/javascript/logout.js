async function logout() {
  // logs the user out 
  const response = await fetch('/api/users/logout', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' }
  });

  if (response.ok) {
    // sends user back to home page
    document.location.replace('/');
  } else {
    alert(response.statusText);
  }
}

document.querySelector('#logout').addEventListener('click', logout);