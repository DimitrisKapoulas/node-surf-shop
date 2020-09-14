const Post = require('../models/post');

module.exports = {
    async getPosts(req, res, next) {
        let posts = await Post.find({})
        res.render('posts/index', {
            posts
        })
    },
    newPost(req, res, next) {
        res.render('posts/new')
    },
    async createPost(req, res, next) {
        let post = await Post.create(req.body)
        res.redirect(`/posts/${post.id}`)
    },
    async showPost(req, res, next) {
        let post = await Post.findById(req.params.id)
        res.render('posts/show', {
            post
        })
    },
    async editPost(req, res, next) {
        let post = await Post.findById(req.params.id)
        res.render('posts/edit', {
            post
        })
    },
    async postUpdate(req, res, next) {
        let post = await Post.findByIdAndUpdate(req.params.id, req.body)
        res.redirect(`/posts/${post.id}`)
    },
    async postDelete(req, res, next) {
        let post = await Post.findByIdAndRemove(req.params.id)
        res.redirect(`/posts`)
    }
}