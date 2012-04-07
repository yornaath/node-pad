
var events = require("events"),
    classextends = require('./classextends'),
    HID = require("../node_modules/node-hid/src/HID")

var Controller

Controller = (function() {

  classextends(Controller, events.EventEmitter)
  
  function Controller() {
    
  }

  Object.defineProperty(Controller.prototype, 'layout', {
    set: function(layout) {
      Object.keys(layout).forEach((function(key) {

        var prop = layout[key]

        Object.defineProperty(this, key, {
          set: function(state) {
            prop.state = state
          },
          get: function(){
            return prop
          }
        })
      }).bind(this))
    }
  })

  return Controller
})()

module.exports = Controller

