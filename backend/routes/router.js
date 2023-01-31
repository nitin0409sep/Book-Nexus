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


// Router Module Exporting 
module.exports = router; 