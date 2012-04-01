
var events = require("events"),
    classextends = require('./classextends')

var Thumb;

Thumb = (function(){
  
  classextends(Thumb, events.EventEmitter)

  function Thumb(){
    Thumb.__super__.constructor.apply(this, arguments)
    var x, y
    x = {
      state: 0
    }
    y = {
      state: 0
    }

    Object.defineProperty(this, 'x', {
      get: function() {
        return x.state
      },
      set: function(state) {
        var oldState
        oldState = x.state
        x.state = state
        oldState !== x.state ? this.emitXAxisChange() : void 0
      }
    })

    Object.defineProperty(this, 'y', {
      get: function() {
        return y.state
      },
      set: function(state) {
        var oldState
        oldState = y.state
        y.state = state
        oldState !== y.state ? this.emitYAxisChange() : void 0
      }
    })

  }

  Thumb.prototype.emitXAxisChange = function() {
    this.emit('x:change', this.x)
  }

  Thumb.prototype.emitYAxisChange = function() {
    this.emit('y:change', this.y)
  }
      
  return Thumb
})()


module.exports = Thumb