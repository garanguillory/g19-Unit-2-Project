var bcrypt = require('bcrypt');

function ensureAuthenticated(req, res, next) {
  // check if user is authenticated
  if(req.user) {
    // if so -> call next()
    return next();
  } else {
    // if not -> redirect to login

    return res.status(403).json({
      status: 403,
      error:'Not Authenticated'
    });
  }
}

function loginRedirect(req, res, next) {
  // check if user is authenticated
  if(req.user) {
    // if so -> redirect to main route
    return res.redirect('/');
  } else {
    // if not -> call next()
    return next();
  }
}

function hashing(password) {
  console.log("to hash ", password);
  var salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
  // Add promises!!!
  // var newPassword;
  // bcrypt.hash(password, 10, function(err, hash) {
  //   newPassword = hash;
  // });
  // return newPassword;
}

function comparePassword(password, hashedPassword) {
  return bcrypt.compareSync(password, hashedPassword);
}


module.exports = {
  ensureAuthenticated: ensureAuthenticated,
  loginRedirect: loginRedirect,
  hashing: hashing,
  comparePassword: comparePassword
};