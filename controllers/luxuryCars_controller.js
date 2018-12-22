var express = require("express");

var router = express.Router();

// Import the model (luxuryCar.js) to use its database functions.
var burger = require("../models/luxuryCar.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
    //adding console.log to make debug easier for the team
    console.log("inside the router.get function of luxuryCars_controller.js")
  luxuryCar.selectAll(function(data) {
    var hbsObject = {
      cars: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/api/cars", function(req, res) {
    console.log("Hit the /api/cars route inside luxuryCars_controller.js with res ",res.body)
  luxuryCar.insert([
    "burger_name", "devoured"
  ], [
    req.body.burger_name, req.body.devoured
  ], function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

router.put("/api/cars/:id", function(req, res) {
    //   console.log("Hit the /api/cars/:id route inside luxuryCars_controller.js with id = ",req.params.id);
  var condition = "id = " + req.params.id;
  luxuryCar.update({
    available: req.body.available
  }, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});


// Export routes for server.js to use.
module.exports = router;