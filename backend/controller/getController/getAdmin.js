// Admin already Logged In

module.exports.getAdminLogin = async (req, res) => {       // Admin Login Page
    res.redirect('adminSecret');
}  