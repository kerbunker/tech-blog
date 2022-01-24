async function newFormHandler(event) {
  event.preventDefault();

  // gets the data for the title and content of a new post
  const title = document.querySelector('input[name="post-title"]').value;
  const post_content = document.querySelector('textarea[name="post-content"]').value;

  // calls the post api to create a new post with given data
  const response = await fetch(`/api/posts`, {
    method: 'POST',
    body: JSON.stringify({
      title,
      post_content
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    // if created, sends user to the dashboard
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
}

// listens for submit button click
document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);