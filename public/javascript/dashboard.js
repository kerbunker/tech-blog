async function createPostHandler(event) {
  event.preventDefault();

  document.location.replace('/create-post');
};


document.querySelector('.new-post-btn').addEventListener('click', createPostHandler);
