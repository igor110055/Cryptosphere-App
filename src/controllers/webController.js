
/**********************/
/*** Web Controller ***/
/**********************/

const asyncHandler  = require('express-async-handler');
const createError   = require('http-errors');
const async         = require('async');

const menuData      = require('../data/menuData');
// const Group         = require('../models/group');
// const User          = require('../models/user');

/*
 * View the Landing page
 * Method: 'GET', url = '/', Access: 'Public'
 */
const getHomePage = asyncHandler(async (req, res, next) => {

    let data = {
        page_title: 'Home',
        url: req.url,
        menu_data: menuData,
        title: 'Weather',
        name: 'Andrew Mead',
        // layout: 'default'     // incase alternative layout required
    }

    res.render('main/home', data); 
}); 


/*
 * View tradingview demo page
 * Method: 'GET', url = '/tvdemo', Access: 'Public'
 */
const getTradingViewDemo = asyncHandler(async (req, res, next) => {

    let data = {
        page_title: 'TradingViewDemo',
        url: req.url,
        menu_data: menuData,
        title: 'TradingView Demo',
        name: 'Tammi Takaya',
        layout: false     // layout not required
    }

    res.render('tvdemo/index', data); 
}); 


// ---- Coinview Related -----------------------------------------

const {
    getAccountInfo, buyCrypto, sellCrypto, getCryptoHistory
} = require('../apps/coinview/coinview_libs');

/*
 * View CoinView demo page
 * Method: 'GET', url = '/coinview', Access: 'Public'
 */
const getCoinViewDemo = asyncHandler(async (req, res, next) => {

    const jsonInfo = await getAccountInfo();
    const info = JSON.parse(jsonInfo)

    const account = Object.keys(info).includes('account') ? info.account : false;
    const exchange_info = Object.keys(info).includes('exchange_info') ? info.exchange_info : false;
    const symbols = Object.keys(info).includes('symbols') ? info.symbols : false;
    let balances = Object.keys(info).includes('balances') ? info.account : false;    
    if (balances) {
        balances = info.balances.filter((balance) => parseFloat(balance.free) !== 0.00);
    }

    // Get an array of flash message by passing the key to req.consumeFlash()
    // const messages = await req.consumeFlash('messages');
    // const errors = await req.consumeFlash('errors');
    // Notes:
    // - the flash message is an array. You can use await req.flash('key', 'value') several times 
    //   and all the value will be stored to the key. 
    // - Then when you call await req.consumeFlash('key'), it will give you an array which 
    //    contains all the value you want to flash.
    // - The Flash message will be set to null after you call await req.consumeFlash('key') 
    //   from session which means it will be removed from your session.

    let data = {
        page_title: 'CoinView',
        url: req.url,
        menu_data: menuData,
        title: 'CoinView',
        account: account,
        balances: balances,
        exchange_info: exchange_info,
        symbols: symbols,
        messages: req.flash('messages'),
        errors: req.flash('errors'),
        layout: false     // layout not required
    }

    res.render('coinview/index', data); 
}); 


/*
 * BuyCrypto CoinView page
 * Method: 'POST', url = '/coinview/buy/:symbol/:quantity', Access: 'Private'
 */
const coinviewBuy = asyncHandler(async (req, res, next) => {

    // TODO: validate the inputs
    const symbol = req.body.symbol;
    const quantity = req.body.quantity;

    const jsonInfo = await buyCrypto(symbol, quantity);
    const info = JSON.parse(jsonInfo);

    // send a redirect with a flash message
    if (info.status && info.status === "success") {
        req.flash('messages', 'Successfully bought crypto');
    }
    else {
        req.flash('errors', 'Unable to buy crypto');
    }

    return res.redirect('/coinview');
}); 


/*
 * SellCrypto CoinView page
 * Method: 'POST', url = '/coinview/buy/:symbol/:quantity', Access: 'Private'
 */
const coinviewSell = asyncHandler(async (req, res, next) => {
    // TODO: validate the inputs
    const symbol = req.body.symbol;
    const quantity = req.body.quantity;

    const jsonInfo = await sellCrypto(symbol, quantity);
    const info = JSON.parse(jsonInfo);

    // send a redirect with a flash message
    if (info.status && info.status === "success") {
        req.flash('messages', 'Successfully sold crypto');
    }
    else {
        req.flash('errors', 'Unable to sell crypto');
    }

    return res.redirect('/coinview');
}); 


const coinviewSettings = asyncHandler(async (req, res, next) => {
    res.send('Settings'); 
}); 


/*
 * View CoinView demo page
 * Method: 'GET', url = '/coinview', Access: 'Public'
 */
const coinviewHistory = asyncHandler(async (req, res, next) => {
    const jsonData = await getCryptoHistory();
    const data = JSON.parse(jsonData)
    res.json(data);
}); 

// ---- ------------------ -----------------------------------------


// /*
//  * View the Home page
//  * Method: 'GET', url = '/workspace', Access: 'Public'
//  */
// const getWorkspacePage = asyncHandler(async (req, res, next) => {

//     let data = {
//         page_title: 'Workspace',
//         url: req.url,
//         menu_data: menuData,
//         layout: 'layouts/workspace'
//     }

//     res.render('main/workspace', data); 

// }); 

// // Method: 'GET', url = '/about', Access: 'Public'
// const getAboutPage = asyncHandler(async (req, res) => {

//     let data = {
//         page_title: 'About',
//         url: req.url,
//         menu_data: menuData
//     }

//     res.render('main/about', data); 
// }); 


// // Method: 'GET', url = '/contact', Access: 'Public'
// const getContactPage = asyncHandler(async (req, res) => {

//     let data = {
//         page_title: 'Contact',
//         url: req.url,
//         menu_data: menuData
//     }

//     res.render('main/contact', data); 
// }); 


// // Method: 'GET', url = '/services', Access: 'Public'
// const getServicesPage = asyncHandler(async (req, res) => {

//     let data = {
//         page_title: 'Services',
//         url: req.url,
//         menu_data: menuData
//     }

//     res.render('main/services', data); 
// }); 


// // Method: 'GET', url = '/login', Access: 'Public'
// const getLoginPage = asyncHandler(async (req, res) => {
//     if (req.user) return res.redirect('/');

//     let data = {
//         page_title: 'Login',
//         url: req.url,
//         menu_data: menuData,
//         message: req.flash('loginMessage'),
//         layout: 'layouts/auth'
//     };

//     res.render('auth/login', data); 
// }); 


// // Method: 'GET', url = '/register', Access: 'Public'
// const getRegisterPage = asyncHandler(async (req, res) => {

//     let data = {
//         page_title: 'Register',
//         url: req.url,
//         menu_data: menuData,
//         errors: req.flash('errors'),
//         layout: 'layouts/auth'
//     }

//     res.render('auth/register', data); 
// }); 


// // /*
// //  * Register the User
// //  * Method: 'POST', url = '/register', Access: 'Public'
// //  */
// const webRegisterUser = (req, res, next) => {

//     async.waterfall([

//         function(callback) {
//             Group.findOne({ groupname: 'basic' }, function(err, group) {
//                 if (err) return next(err);
//                 if (!group) {
//                     console.log("Basic Group not found");
//                     req.flash('errors', 'Default Group Basic does not exist');  // same as jsf.flash to survive redirect?
//                     return res.redirect('/register');        
//                 }
//                 else {
//                     callback(null, group);
//                 }   
//             });
//         },

//         function(group, callback) {
//             var user = new User();
    
//             user.username        = req.body.username;           // 'username' field sent from page
//             // user.profile.firstname = req.body.firstname;     // 'firstname' field sent from page
//             // user.profile.lastname = req.body.lastname;       // 'lastname' field sent from page
//             user.email           = req.body.email;              // 'email' field sent from page
//             user.password        = req.body.password;           // 'password' field sent from page
//             user.profile.picture = user.gravatar();
//             user.groups          = [ group._id ];
            
//             User.findOne({ email: req.body.email }, function(err, existingUser) {
//                 if (err) return next(err);
//                 if (existingUser) {
//                     //console.log(req.body.email + " already exists");
//                     req.flash('errors', 'Account with that email already exists');  // same as jsf.flash to survive redirect?
//                     return res.redirect('/register');
//                 } else {
//                     user.save(function(err, user) {
//                         if (err) return next(err);
//                         //res.json("New user has been created");
//                         callback(null, user);
//                     });
//                 }
//             });
//         },
  
//         function(user) {

//             // only valid for ecommerce apps
//             // var cart = new Cart();
//             // cart.owner = user._id;
//             // cart.save( function(err) {
//             //     if (err) return next(err);
//             //     req.logIn(user, function(err) {         // This function adds the session to the server and cookie to the browser
//             //         if (err) return next(err);
//             //         res.redirect('/portal1/profile');
//             //     });
//             // });

//             // Passport exposes a login() function on req (also aliased as logIn()) that can be used 
//             // to establish a login session. 
//             // - When the login operation completes, user will be assigned to req.user.
//             // - The function adds the session to the server and cookie to the browser
//             req.login(user, function(err) {  
//                 if (err) return next(err);
//                 res.redirect('/profile');
//             });
//         }
//     ]);
    
// }; 


// /*
//  * Get the Profile page
//  * Method: 'GET', url = '/profile', Access: 'Private'
//  */
// const getProfilePage = asyncHandler(async (req, res, next) => {

//     User.findOne({ _id: req.user._id }, function(err, foundUser) {     
//         if (err) return next(err);

//         let data = {
//             page_title: 'Profile',
//             url: req.url,
//             menu_data: menuData,
//             user: foundUser
//         }
    
//         res.render('auth/profile', data);
//     });

// }); 


// /*
//  * Get the Edit Profile page
//  * Method: 'GET', url = '/edit_profile', Access: 'Private'
//  */
// const getEditProfilePage = asyncHandler(async (req, res, next) => {
//     let data = {
//         page_title: 'Edit Profile',
//         url: req.url,
//         menu_data: menuData,
//         message: req.flash('success')
//     }

//     res.render('auth/edit_profile', data)
// }); 


// /*
//  * Edit the User's Profile
//  * Method: 'POST', url = '/edit_profile', Access: 'Private'
//  */
// const editProfileWeb = asyncHandler(async (req, res, next) => {
//     User.findOne({ _id: req.user._id }, function(err, user) {
  
//         if (err) return next(err);
//         if (req.body.firstname) user.profile.firstname = req.body.firstname;
//         if (req.body.lastname) user.profile.lastname = req.body.lastname;
//         if (req.body.address) user.address = req.body.address;
    
//         user.save(function(err) {
//             if (err) return next(err);
//             req.flash('success', 'Successfully Edited your profile');
//             return res.redirect('/profile');
//         });
//     });
// }); 


// /*
//  * Logout the current user
//  * Method: 'GET', url = '/logout', Access: 'Private'
//  */
// const logoutUserWeb = asyncHandler(async (req, res) => {
//     // unreliable
//     // req.logout();
//     // res.redirect('/');

//     req.session.destroy(function (err) {
//         res.redirect('/'); 
//     });
// }); 


module.exports = { 
    getHomePage,
    getTradingViewDemo,
    getCoinViewDemo,
    coinviewBuy,
    coinviewSell,
    coinviewHistory,
    // getWorkspacePage,
    // getAboutPage,
    // getContactPage,
    // getServicesPage,
    // getLoginPage,
    // getRegisterPage,
    // webRegisterUser,
    // getProfilePage,
    // getEditProfilePage,
    // editProfileWeb,
    // logoutUserWeb
};


// *** Usage of Flash ***
// // Method: 'GET', url = '/login', Access: 'Public'
// const getLoginPage = asyncHandler(async (req, res) => {
//     if (req.user) return res.redirect('/');

//     let data = {
//         page_title: 'Login',
//         url: req.url,
//         menu_data: menuData,
//         message: req.flash('loginMessage'),
//         layout: 'layouts/auth'
//     };

//     res.render('auth/login', data); 
// }); 

// router
//     .route('/login')
//         .get(getLoginPage)
//         .post( 
//             // use Passport middleware for actual login
//             passport.authenticate('local-login', {
//                 successRedirect: '/workspace',
//                 failureRedirect: '/login',
//                 failureFlash: true }));

// Middleware
// passport.use('local-login', new LocalStrategy({
//     usernameField: 'email',
//     passwordField: 'password',
//     passReqToCallback: true
// }, function(req, email, password, done) {
//     User.findOne({ email: email }, function(err, user) {
//         if (err) return done(err);
//         if (!user) {
//             return done(null, false, req.flash('loginMessage', 'No user has been found'));
//         }
//         if (!user.comparePassword(password)) {
//             return done(null, false, req.flash('loginMessage', 'Oops! Wrong Password pal'));
//         }
//         return done(null, user);
//     });
// }));