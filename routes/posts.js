const express = require('express');
const router = express.Router();
const multer = require('multer')
const upload = multer({'dest': 'uploads/'})
const { getPosts, newPost, createPost, showPost, editPost, postUpdate, postDelete } = require('../controllers/posts')

/* GET posts index /posts */
router.get('/', getPosts);

/* GET posts new /posts/new */
router.get('/new', newPost);

/* POST posts create /posts */
router.post('/', upload.array('images', 4), createPost);

/* GET posts show /posts/:id */
router.get('/:id', showPost);

/* GET posts edit /posts/:id/edit */
router.get('/:id/edit', editPost);

/* PUT posts update /posts/:id */
router.put('/:id', upload.array('images', 4), postUpdate);

/* DELETE posts destroy /posts/:id */
router.delete('/:id', postDelete);

module.exports = router;