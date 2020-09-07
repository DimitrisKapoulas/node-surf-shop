const User = require('../models/user');
const passport = require('passport')

module.exports = {
    async postRegister(req, res, next) {
        console.log('registering user');
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            image: req.body.image
        })
        try {
            await User.register(newUser, req.body.password)
            res.redirect('/')
        } catch (error) {
            console.log(error)
        }

    },
    postLogin(req, res, next) {
        passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/login'
        })(req, res, next)
    },
    getLogout(req, res, next) {
        req.logOut()
        res.redirect('/')
    }
}