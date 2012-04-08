
var PortController = require('./PortController'),
    Controller = require('./Controller'),
    DualShock = require('./DualShock')

var dualShockPortController = null

var api = {}

Object.defineProperty(api, 'dualshock', {
  get: function() {
    if(dualShockPortController) {
      return dualShockPortController
    }
    dualShockPortController = new PortController()
    dualShockPortController.Controller = DualShock
    return dualShockPortController  
  }
})

module.exports = api