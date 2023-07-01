module.exports = {
    eAdmin: function(req, res, next) {
        if(req.isAuthenticated() && req.user.admin === 1) {
            return next()
        }

        req.flash("error_msg", "You must be an administrator to enter here")
        res.redirect("/")
    }
}