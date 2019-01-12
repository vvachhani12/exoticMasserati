module.exports = {
    ensureAuthenticated: function(req, res, next) {
      console.log('Check if the client is authenticated. ( '+ req.isAuthenticated() +' )');
      if (req.isAuthenticated()) {
        return next();
      }
      // req.flash('error_msg', 'Please log in to view that resource');
      res.redirect('/user/login');
    }
  };