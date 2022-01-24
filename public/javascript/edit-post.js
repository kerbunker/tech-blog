async function editFormHandler(event) {
  event.preventDefault();

  //gets the title, post content, and id to edit an existing post
  const title = document.querySelector('input[name="post-title"]').value.trim();
  const post_content = document.querySelector('textarea[name="post-content"]').value.trim();
  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];
  const response = await fetch(`/api/posts/${id}`, {
    //calls the route to edit the post
    method: 'PUT',
    body: JSON.stringify({
      title,
      post_content
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    // sends user back to the dahsboard
    document.location.replace('/dashboard/');
  } else {
    alert(response.statusText);
  }
}

document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);