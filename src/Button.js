
var events = require("events"),
    classextends = require('./classextends')


var Button;

Button = (function(){
  
  classextends(Button, events.EventEmitter)

  function Button() {
    Button.__super__.constructor.apply(this, arguments)
    
    var state = 0

    Object.defineProperty(this, "state", {
      get: function() {
        return state
      },
      set: function(newState) {
        var oldState
        oldState = state
        state = newState
        !oldState && newState ? this.emitPress() : 
        oldState && !newState ? this.emitRelease() :
                                void 0
        this.emitStateChange()
      }
    })

  }

  Button.prototype.emitStateChange = function() {
    this.emit('statechange', this.state)
  }

  Button.prototype.emitPress = function() {
    this.emit('press')
  }

  Button.prototype.emitRelease = function() {
    this.emit('release')
  }

  return Button
})()

module.exports = Button