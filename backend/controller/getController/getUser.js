const jwt = require('jsonwebtoken');

const Admin = require('../../models/Admin');

const User = require('../../models/User');


module.exports.getHome = async (req, res) => {                             // Home Page
    try {
        if (req.cookies.admin) {
            const adminToken = req.cookies.admin;
            const adminVerifyToken = jwt.verify(adminToken, "hellomynameisnitinvermaiamamerndeveloper");
            const admin = await Admin.findOne({ _id: adminVerifyToken._id })
            if (admin) {
                res.redirect("adminSecret");
            } else {
                res.redirect('/');
            }
        } else if (req.cookies.user) {
            const userToken = req.cookies.user;
            const userVerifyToken = jwt.verify(userToken, "jwtnewkeygeneratedbymrnitinvermathemsjrjsuejduejekejs");
            const user = await User.findOne({ _id: userVerifyToken._id });
            if (user) {
                res.redirect("userSecret");
            } else {
                res.redirect('/');
            }
        } else {
            res.render('home');
        }
    } catch (err) {
        res.render('home');
    }
}

// Already Logged 
module.exports.getRegister = async (req, res) => {      // Register Page
    try {
        const token = req.cookies.user;

        const verifyToken = jwt.verify(token, "jwtnewkeygeneratedbymrnitinvermathemsjrjsuejduejekejs");

        // User verification from DB
        const user = await User.findOne({ _id: verifyToken._id });

        if (user) {
            res.redirect('userSecret');
        } else {
            res.redirect('register');
        }
    } catch (err) {
        res.render('register');
    };
}


// User already Logged In
module.exports.getUserLogin = async (req, res) => {    // Login Page
    res.redirect('userSecret');
}
