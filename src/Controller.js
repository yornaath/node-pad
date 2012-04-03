
var events = require("events"),
    classextends = require('./classextends'),
    HID = require("../node_modules/node-hid/src/HID")

var Controller

Controller = (function() {

  classextends(Controller, events.EventEmitter)
  
  function Controller() {
    
  }

  Controller.prototype.init = function() {
    
  }

  return Controller
})()

module.exports = Controller

