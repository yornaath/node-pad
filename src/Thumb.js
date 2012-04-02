
require('./Object.js')

var events = require("events"),
    classextends = require('./classextends')


var Thumb;


Thumb = (function(){
  
  classextends(Thumb, events.EventEmitter)

  function Thumb(options){
    Thumb.__super__.constructor.apply(this, arguments)
    this.config = Thumb.defaultConfig
    options && options.deadzone ? this.config.deadzone = options.deadzone : void 0
    this.axis = {
      x: {
        state: options && options.x ? options.x : 0
      },
      y: {
        state: options && options.y ? options.y : 0
      } 
    }
  }

  Object.defineProperty(Thumb.prototype, 'x', {
    get: function() {
      return this.axis.x.state
    },
    set: function(state) {
      var oldState
      oldState = this.axis.x.state
      this.axis.x.state = state
      oldState !== this.axis.x.state ?
        this.config.deadzone.x !== false ?
          state < this.config.deadzone.x[0] || state > this.config.deadzone.x[1] ?
            this.emitXAxisChange()
          : this.released ? this.emitReleaseEvent() : void 0
        : this.emitXAxisChange()
      : void 0
    }
  })

  Object.defineProperty(Thumb.prototype, 'y', {
    get: function() {
      return this.axis.y.state
    },
    set: function(state) {
      var oldState
      oldState = this.axis.y.state
      this.axis.y.state = state
      oldState !== this.axis.y.state ?
        this.config.deadzone.y !== false ?
          state < this.config.deadzone.y[0] || state > this.config.deadzone.y[1] ?
            this.emitYAxisChange()
          : this.released ? this.emitReleaseEvent() : void 0
        : this.emitYAxisChange()
      : void 0
    }
  })

  Object.defineProperty(Thumb.prototype, 'released', {
    get: function() {
      return (this.x > this.config.deadzone.x[0] && this.x < this.config.deadzone.x[1]) && 
      (this.y > this.config.deadzone.y[0] && this.y < this.config.deadzone.y[1]) ?
        true
      : false
    }
  })

  Thumb.defaultConfig = {
    deadzone: {
      x: false,
      y: false
    }
  }

  Thumb.prototype.emitXAxisChange = function() {
    this.emit('move:x', this.x)
  }

  Thumb.prototype.emitYAxisChange = function() {
    this.emit('move:y', this.y)
  }
  
  Thumb.prototype.emitReleaseEvent = function() {
    this.emit('release')
  }

  return Thumb
})()


module.exports = Thumb