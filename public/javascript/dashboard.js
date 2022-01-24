async function createPostHandler(event) {
  event.preventDefault();
  // send the user to the create post page
  document.location.replace('/create-post');
};

// listens for the create post button click
document.querySelector('.new-post-btn').addEventListener('click', createPostHandler);
