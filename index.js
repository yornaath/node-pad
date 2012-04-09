
var PortController = require('./src/PortController'),
    Controller = require('./src/Controller'),
    DualShock3 = require('./src/DualShock3')

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