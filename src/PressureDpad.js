
var Dpad = require('./Dpad.js'),
    classextends = require('./classextends'),
    PressureButton = require('./PressureButton.js')


var PressureDpad;

PressureDpad = (function(){
  
  classextends(PressureDpad, Dpad)

  function PressureDpad() {
    PressureDpad.__super__.constructor.apply(this, arguments)
  }

  Object.defineProperty(PressureDpad.prototype, 'ButtonClass', {
    value: PressureButton
  })

  Object.defineProperty(PressureDpad.prototype, 'averagePressure', {
    get: function() {
      var totalPressure, keysPressed
      totalPressure = 0
      keysPressed = Object.keys(this.currentlyPressed)
      keysPressed.forEach((function(key) {
        totalPressure += this[key].pressure
      }).bind(this))
      return (totalPressure / keysPressed.length)
    }
  })
    
  PressureDpad.prototype.emitPress = function(direction) {
    this.emit('press:'+direction, this[direction].state)
    this.emitCombination()
  }

  PressureDpad.prototype.emitRelease = function(direction) {
    this.emit('release:'+direction, this[direction].state)
    this.emitCombination()
  }

  PressureDpad.prototype.emitCombination = function() {
    this.emit('combination:'+Object.keys(this.currentlyPressed).join('+'), this.averagePressure)
  }

  return PressureDpad
})()

module.exports = PressureDpad