
var Button = require("./Button.js"),
    classextends = require('./classextends')


var PressureButton;

PressureButton = (function(){
  
  classextends(PressureButton, Button)

  function PressureButton() {
    PressureButton.__super__.constructor.apply(this, arguments)
    Object.defineProperty(this, "pressure", {
      get: function() {
        return this.state
      }
    })

    this.on('statechange', function() {
      this.emit('pressurechange', this.pressure)
    })
  }

  PressureButton.prototype.emitPress = function() {
    this.emit('press', this.pressure)
  }

  return PressureButton
})()

module.exports = PressureButton