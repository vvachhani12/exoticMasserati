var orm = require("../config/orm.js");

var cars = {
    selectAll: function(cb) {
      orm.selectAllCars(function(res) {
        cb(res);
      });
    },

    selectSome: function(carMake,cb) {
        orm.selectWhere(carMake, function(res) {
          cb(res);
        });
      },

      create: function(carYear, carMake,carModel, transmission, startDate, endDate, miles, carImg, carRate, availability, condition, cb) {
        var Test = {
          car_Year: carYear,
          car_Make: carMake,
          car_Model: carModel,
          car_trans: transmission,
          Start_Date: startDate,
          end_Date: endDate,
          car_Miles: miles,
          car_Img: carImg,
          car_Rate: carRate,
          car_Availability: availability,
          car_Condition: condition
        }
        console.log (Test);
        orm.createCar(carYear, carMake,carModel, transmission, startDate, endDate, miles, carImg, carRate, availability, condition, function(res) {
          cb(res);
        });
      },
    updateOne: function(startDate, endDate, thisID, cb) {
      orm.updateAvail(startDate, endDate, thisID, function(res) {
        cb(res);
      });
    },
  //   delete: function(id, cb) {
  //     orm.delete(id, function(res) {
  //       cb(res);
  //     });
  //   }

  getAllMake: function(cb){
    orm.getAllMake(function(res){
      cb(res);
    });
  },
  getAllModel: function(carMake, cb) {
    orm.getAllModel(carMake, function(res){
      cb(res);
    });
  }
  };

  module.exports = cars;