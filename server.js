const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 8080;

// required for passport
const session = require('express-session')
const flash = require('connect-flash');

// Import routes and give the server access to them.
const routes = require("./controllers/luxuryCars_controller.js");

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(__dirname+"/public"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// Set Handlebars.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(cookieParser('528259c2-3056-4022-a914-4bda76a1b4f7'));

// configure Express session
app.use(session({
  secret: '528259c2-3056-4022-a914-4bda76a1b4f7',
  resave: true,
  saveUninitialized: true,
  cookie: { httpOnly: true }
}));

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

app.use(function (err, req, res, next) {
  if (err) {
    console.error(err);
  }
  return next();
});

app.use(routes);

app.use('/user/', userRoutes);

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});
