module.exports.viewProfile = (req, res) => {
    const user = req.userData;

    res.render('view-profile', {
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        address: user.address
    });
}