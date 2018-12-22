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


    create: function(carYear, carMake, carModel, transmission, startDate, endDAte, miles, cb) {
      orm.createCar(carYear, carMake, carModel, transmission, startDate, endDAte, miles, function(res) {
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
  };

  module.exports = cars;