
var events = require("events"),
    classextends = require('./classextends')

var Controller

Controller = (function() {

  classextends(Controller, events.EventEmitter)
  
  function Controller() {
    this.layout = this.getLayout()
    this.connected = 0
    this.on('error', function() {
      if(this.connected) {
        this.connected = 0
        this.emit('disconnect')
      }
    })
  }

  Controller.readIntervalTime = 5

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

  Controller.prototype.startReadingHID = function() {
    if(!this.readInterval) {
      this.readInterval = setInterval((function(){
        if(this.HIDDevice) {
          var self = this
          this.HIDDevice.read(function(err, data){
            if(err) {
              self.emit('error', err)
            } else {
              self.connected = 1
              self.dataParser(data)
            }
          })
        }
      }).bind(this), Controller.readIntervalTime) 
    }
  }

  Controller.prototype.stopReadingHID = function() {
    if(this.readInterval) {
      this.connected = 0
      clearInterval(this.readInterval)
    }
  }

  return Controller
})()

module.exports = Controller

