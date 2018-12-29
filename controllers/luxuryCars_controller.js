var express = require("express");

var router = express.Router();

// Import the model (luxuryCar.js) to use its database functions.
var luxuryCar = require("../models/luxuryCar.js");


// You can use the below for debug purposes if needed
// var luxuryCar = require("../config/orm.js")

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

router.get("/api/my_choice/:id", function(req, res) {
    //adding console.log to make debug easier for the team
    console.log("inside the router.get function for specific vehicle for luxuryCars_controller.js")
  luxuryCar.selectSome(function(data) {
    var hbsObject = {
      cars: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/api/cars", function(req, res) {
    console.log("Hit the /api/cars route inside luxuryCars_controller.js with res ",res.body)
  luxuryCar.create([
    "car_Year", "car_Make","car_Model","transmission_Type","start_DA","end_DA","car_Miles","car_Availability","car_Rates","car_Condition","car_ImageURL"
  ], [
    req.body.car_Year, req.body.car_Make,req.body.car_Model, req.body.transmission_Type, req.body.start_DA, req.body.end_DA, req.body.car_Miles, req.body.car_Availability, req.body.car_Rates, req.body.car_Condition,req.body.car_ImageURL
  ], function(result) {
    // Send back the ID of the new car
    res.json({ id: result.insertId });
  });
});

router.put("/api/cars/:id", function(req, res) {
    //   console.log("Hit the /api/cars/:id route inside luxuryCars_controller.js with id = ",req.params.id);
  var condition = "id = " + req.params.id;
  luxuryCar.updateAvail({
    available: req.body.car_Availability
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