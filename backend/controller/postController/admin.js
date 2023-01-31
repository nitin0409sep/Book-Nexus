const Admin = require('../../models/Admin');

const bcrypt = require('bcryptjs');
const e = require('express');

// Registering Admin Details
const createAdmin = async (req, res) => {
    try {
        const name = "Admin";
        const email = "admin@admin.com";
        const password = "12345";

        const data = new Admin({
            name: name,
            email: email,
            password: password
        });

        // const ans = await data.save();
    } catch (err) {
        console.log(err);
    }
}

createAdmin();


// Admin Login
module.exports.adminLogin = async (req, res) => {
    try {
        if (req.cookies.user) {  // User already logged in but want to access, adminSecret page 
            res.redirect('userSecret');
        } else {
            const email = req.body.email;
            const password = req.body.password;

            const admin = await Admin.findOne({ email: email });

            const isPassword = await bcrypt.compare(password, admin.password);
            if (isPassword) {

                // JWT Token 
                const token = await admin.generateAuthToken();

                // Cookie
                res.cookie('admin', token, {
                    expires: new Date(Date.now() + 300000)
                });

                res.render('adminSecret', {
                    name: admin.name,
                    email: admin.email
                });
            } else {
                throw Error("Invalid Credentials");
            }
        }
    } catch (err) {
        res.status(400).redirect('adminLogin');;
    }
}


// Admin Secret Page
module.exports.adminAuth = ((req, res) => {
    const data = req.adminData;  // Accessing data from previous middleware
    res.render('adminSecret', {
        name: data.name,
        email: data.email
    });
});


// Admin Logout
module.exports.adminLogout = ((req, res) => {
    res.cookie("admin", 'token', { maxAge: 1 });
    res.redirect('/');
});
