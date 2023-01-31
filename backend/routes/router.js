// Express
const express = require('express');

// Router
const router = express.Router();

// GET Controller
const getAdmin = require('../controller/getController/getAdmin');
const getUser = require('../controller/getController/getUser');

// POST Controller
const adminController = require('../controller/postController/admin');
const userController = require('../controller/postController/user');

// Autherization
const adminAuth = require('../authentication/adminAuth');
const userAuth = require('../authentication/userAuth');

// User Utility
const userUtilityViewProfile = require('../user-utility/view-profile');
const userUtilityEditProfile = require('../user-utility/edit-profile');
const userUtilityUpdatePassword = require('../user-utility/change-password');

// GET Request's
router.get('/', getUser.getHome);                     // Home Page
router.get('/register', getUser.getRegister);         // Register Page
router.get('/adminLogin', adminAuth, getAdmin.getAdminLogin);    // Admin Login Page
router.get('/userLogin', userAuth, getUser.getUserLogin);       // Login Page


// POST Request's 
router.post('/adminLogin', adminController.adminLogin);  // Admin Login
router.post('/register', userController.register);       // Register
router.post('/userLogin', userController.userLogin);     // User Login

// Autherization
router.get('/adminSecret', adminAuth, adminController.adminAuth);  // Admin 
router.get('/userSecret', userAuth, userController.userAuth);      // User 

// Logout
router.get('/adminLogout', adminAuth, adminController.adminLogout);  // Admin
router.get('/userLogout', userAuth, userController.userLogout);      // User

/* User Utility */
// View Profile
router.get('/view-profile', userAuth, userUtilityViewProfile.viewProfile);

// Update Profile
router.get('/edit-profile', userAuth, userUtilityEditProfile.editProfile);
router.post('/update-profile', userAuth, userUtilityEditProfile.updateProfile);

// Update Password
router.get('/change-password', userAuth, userUtilityUpdatePassword.updatePassword);
router.post('/updatePassword', userAuth, userUtilityUpdatePassword.changePassword);


// Router Module Exporting 
module.exports = router; 