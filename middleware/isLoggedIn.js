module.exports = (req, res, next) => {
    if (!req.user) {
        console.log(`👹 You can't be here!`);
        req.flash('error', 'You must be logged in to access that page');
        res.redirect('/auth/login');
    } else {
        next();
    }
}