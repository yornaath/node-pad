
var PortController = require('./PortController'),
    Controller = require('./Controller'),
    DualShock3 = require('./DualShock3')

var dualShockPortController = null

var api = {}

Object.defineProperty(api, 'dualshock3', {
  get: function() {
    if(dualShockPortController) {
      return dualShockPortController
    }
    dualShockPortController = new PortController()
    dualShockPortController.Controller = DualShock3
    return dualShockPortController  
  }
})

module.exports = api