var connection = require("../config/connection.js");

var orm = {

//// this will select all available cars 
selectAllCars: function(cb) {
var queryString = "SELECT * FROM cars";
    connection.query(queryString, function(err, result) {
      if (err) throw err;
      cb(result)
      console.log(result);
    });
  },
//// this will select cars of a certain make 

selectWhere: function(carMake, cb) {
    var queryString = "SELECT * FROM cars WHERE car_Make = ?";
    connection.query(queryString,carMake, 
        function(err, result) {

      if (err) throw err;
      cb(result)
      console.log(result);
    });
  },

// adding a car to the database
  createCar: function(carYear, carMake, carModel, transmission, startDate, endDAte, miles, cb) {
    var queryString = "INSERT INTO cars SET ?";
    console.log(queryString);
    connection.query(queryString,
        
        {
          car_Year: carYear,
          car_Make: carMake,
          car_Model: carModel, 
          transmission_Type: transmission, 
          start_DA: startDate, 
          end_DA: endDAte, 
          car_Miles: miles
        },
        function(err, result) {
      if (err) throw err;
      cb(result)
      console.log(result);
    });
  },

  //updating the availabilty of a car 
//   all submissions need to be in this format '2018-01-01'

  updateAvail: function(startDate, endDate, thisID, cb) {
    var queryString = "UPDATE cars SET ? WHERE ?";
    console.log(queryString);
    connection.query(queryString,
        
        [{ 
            start_DA: startDate,
            end_DA: endDate,
          }, 
         {
            id: thisID,
         }
        ],
        
        
    function(err, result) {
      if (err) throw err;
      cb(result)
      console.log(result);
    });
  },
}



module.exports = orm;