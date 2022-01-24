// allows a new comment to be made
async function commentFormHandler(event) {
  event.preventDefault();

  //gets the comment data and post_id for the comment
  const comment_text = document.querySelector('textarea[name="comment-body"]').value.trim();
  const post_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  if (comment_text) {
    // calls the route to create a new comment
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({
        post_id,
        comment_text
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      // reloads the page to show new comment
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
}

// listens for button click to create new comment
document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);