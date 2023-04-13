module.exports = (req, res) => {
    res.clearCookie('jwtoken');
    res.redirect('/auth/login');
}