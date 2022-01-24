// gets the necessary information from files and packages
const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// get all posts from logged in user
router.get('/', withAuth, (req, res) => {
  Post.findAll({
    where: {
      user_id: req.session.user_id
    },
    attributes: [
      'id',
      'title',
      'post_content',
      'created_at'
    ],
    include: [
      {
        // includes the comments associated with the posts
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        // includes the user who made the post
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      const posts = dbPostData.map(post => post.get({ plain: true }));
      // renders the dashboard handlebars page with the given post data
      res.render('dashboard', { posts, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// gets a single post to edit by id
router.get('/edit/:id', withAuth, (req, res) => {
  Post.findByPk(req.params.id, {
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
        // includes the user who made the post
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      if (dbPostData) {
        const post = dbPostData.get({ plain: true });
        
        // renders the data on the edit-post view
        res.render('edit-post', {
          post,
          loggedIn: true
        });
      } else {
        res.status(404).end();
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// creates a post using the create-post view
router.get('/create-post', withAuth, (req, res) => {

  res.render('create-post');
});

// exports the dashboard routes
module.exports = router;