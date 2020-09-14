const Post = require('../models/post');
const cloudinary = require('cloudinary')
cloudinary.config({
    cloud_name: 'dxrblaycz',
    api_key: '639339764884796',
    api_secret: `${process.env.CLOUDINARY_SECRET}`
})

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
        req.body.post.images = []
        for (const file of req.files) {
            let image = cloudinary.v2.uploader.upload(file.path)
            req.body.post.images.push({
                url: (await image).secure_url,
                public_id: (await image).public_id
            })
        }
        let post = await Post.create(req.body.post)
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