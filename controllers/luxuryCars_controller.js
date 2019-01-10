var express = require("express");
var path = require("path");
var router = express.Router();
// Import the model (luxuryCar.js) to use its database functions.
var luxuryCar = require("../models/luxuryCar.js");
// You can use the below for debug purposes if needed
// var luxuryCar = require("../config/orm.js")
// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
    //adding console.log to make debug easier for the team
    console.log("inside the router.get function of luxuryCars_controller.js")
    res.render("index");
});

router.get("/mainform", function(req, res) {
  res.render("mainform");

});


router.get("/questionnaire", function(req, res) {
  //adding console.log to make debug easier for the team
  console.log("inside the router.get function of luxuryCars_controller.js")
    res.render("questionnaire");
});
router.get("/rentCar", function(req, res) {
  //adding console.log to make debug easier for the team
  console.log("inside the router.get function of luxuryCars_controller.js")
  luxuryCar.selectAll(function(data) {
    console.log("Data from controller: "+data)
    var carObject = {
      cars: data
    };
    console.log("Object: "+carObject);
    res.render("rentCar", carObject);
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
    console.log("Hit the /api/cars route inside luxuryCars_controller.js with req set as",req.body)
  luxuryCar.create(
    req.body.carYear, req.body.carMake,req.body.carModel, req.body.transmission, req.body.startDate, req.body.endDate, req.body.miles, req.body.carImg, req.body.carRate, req.body.availability, req.body.condition, function(result) {
    // Send back the ID of the new car
    res.json({ id: result.insertId });
  });
});
router.get("/api", function(req, res) {
  luxuryCar.selectAll(function(data) {
  var hbsObject = {
    cars: data
  };
  console.log(hbsObject);
console.log("AUTOCOMPLETE")
res.json(hbsObject);
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


router.get("/api/getAllModel/:make", function(req, res){
  

  luxuryCar.getAllModel(req.params.make, function(result){
    res.json(result);
  });
});


