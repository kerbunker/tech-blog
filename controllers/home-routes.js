const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

// get all posts for homepage
router.get('/', (req, res) => {
  Post.findAll({
    attributes: [
      'id',
      'title',
      'post_content',
      'created_at'
    ],
    include: [
      {
        // includes the comments associated with the post
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        // includes the username of the user who posted
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      const posts = dbPostData.map(post => post.get({ plain: true }));
      // renders the homepage handlebar
      res.render('homepage', {
        posts,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get single post given the post id
router.get('/post/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'title',
      'post_content',
      'created_at'
    ],
    include: [
      {
        // includes the posts comments
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        //includes the author
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }

      const post = dbPostData.get({ plain: true });
      // renders the single-post handlebar data
      res.render('single-post', {
        post,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// logs the user in or redirects to the homepage if the user is already logged in
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  // brings up the login page handlebar
  res.render('login');
});

// allows the user to signup
router.get('/signup', (req, res) => {
  // if the user is already logged in, they are instead directed to the homepage
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  // shows the signup page
  res.render('signup');
});

// goes to the create post page to make a new post
router.get('/create-post', (req, res) => {

  res.render('create-post');
});

// exports the home routes
module.exports = router;
