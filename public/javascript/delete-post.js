async function deleteFormHandler(event) {
  event.preventDefault();
  //gets the post id from the given page
  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];
  // cal;s the route to delete the post
  const response = await fetch(`/api/posts/${id}`, {
    method: 'DELETE'
  });

  if (response.ok) {
    // sends user back to dahsboard
    document.location.replace('/dashboard/');
  } else {
    alert(response.statusText);
  }
}

// delete button listener
document.querySelector('.delete-post-btn').addEventListener('click', deleteFormHandler);