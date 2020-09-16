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
        let post = await Post.findById(req.params.id)
        if (req.body.deleteImages && req.body.deleteImages.length) {
            let deleteImages = req.body.deleteImages
            for (const public_id of deleteImages) {
                //delete images from cloudinary
                await cloudinary.v2.uploader.destroy(public_id)
                //delete images from post.images
                for (const image of post.images) {
                    if (image.public_id === public_id) {
                        let index = post.images.indexOf(image)
                        post.images.splice(index, 1)
                    }
                }
            }
        }
        //check if there are any new images for upload
        if (req.files) {
            //upload images
            for (const file of req.files) {
                let image = cloudinary.v2.uploader.upload(file.path)
                post.images.push({
                    url: (await image).secure_url,
                    public_id: (await image).public_id
                })
            }
        }
        post.title = req.body.post.title
        post.description = req.body.post.description
        post.price = req.body.post.price
        post.location = req.body.post.location
        await post.save()
        res.redirect(`/posts/${post.id}`)
    },
    async postDelete(req, res, next) {
        let post = await Post.findByIdAndRemove(req.params.id)
        res.redirect(`/posts`)
    }
}