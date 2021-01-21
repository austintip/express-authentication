module.exports = (req, res, next) => {
    if (!req.user) {
        console.log(`👹 You can't be here!`);
        res.redirect('/auth/login');
    } else {
        next();
    }
}