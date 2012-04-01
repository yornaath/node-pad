
var events = require("events"),
    classextends = require('./classextends'),
    Button = require('./Button.js')


var Dpad;

Dpad = (function(){
  
  classextends(Dpad, events.EventEmitter)

  function Dpad() {
    Dpad.__super__.constructor.apply(this, arguments)
    var self
    self = this
    this.directions = {
      up: new this.ButtonClass,
      down: new this.ButtonClass,
      left: new this.ButtonClass,
      right: new this.ButtonClass,
    }
    this.currentlyPressed = {}
    Object.keys(this.directions).forEach((function(direction) {
      this.directions[direction].on('press', function() {
        self.currentlyPressed[direction] = true
        self.emitPress(direction)
      })
      this.directions[direction].on('release', function() {
        delete self.currentlyPressed[direction]
        self.emitRelease(direction)
      })
    }).bind(this))
  }

  Object.defineProperty(Dpad.prototype, 'ButtonClass', {
    value: Button
  })

  Object.defineProperty(Dpad.prototype, 'up', {
    get: function() {
      return this.directions['up']
    },
    set: function(state) {
      this.directions['up'].state = state
    }
  })

  Object.defineProperty(Dpad.prototype, 'down', {
    get: function() {
      return this.directions['down']
    },
    set: function(state) {
      this.directions['down'].state = state
    }
  })

  Object.defineProperty(Dpad.prototype, 'left', {
    get: function() {
      return this.directions['left']
    },
    set: function(state) {
      this.directions['left'].state = state
    }
  })

  Object.defineProperty(Dpad.prototype, 'right', {
    get: function() {
      return this.directions['right']
    },
    set: function(state) {
      this.directions['right'].state = state
    }
  })

  Dpad.prototype.on = function(key, handler) {
    if(key.match('combination:')) {
      var key, keys, combokeys
      key = key.replace('combination:', '')
      keys = key.split('+')
      combokeys = []
      keys.forEach(function(key) {
        key === 'up'   ? combokeys[0] = key :
        key === 'down' ? combokeys[1] = key :
        key === 'left' ? combokeys[2] = key :
                         combokeys[3] = key
      })
      combokeys.sort()
      Dpad.__super__.on.apply(this, [combokeys.sort().join('+'),handler])
    } else {
      Dpad.__super__.on.apply(this, [key,handler])
    }
  }

  Dpad.prototype.emit = function(key) {
    if(key.match('combination:')) {
      var args, key, keys, combokeys, i
      args = []
      key = key.replace('combination:', '')
      keys = key.split('+')
      combokeys = []
      keys.forEach(function(key) {
        key === 'up'   ? combokeys[0] = key :
        key === 'down' ? combokeys[1] = key :
        key === 'left' ? combokeys[2] = key :
                         combokeys[3] = key
      })
      combokeys.sort()
      args.push(combokeys.join('+'))
      for(i = 1; i < arguments.length; i++) {
        args.push(arguments[i])
      }
      Dpad.__super__.emit.apply(this, args)
    } else {
      Dpad.__super__.emit.apply(this, arguments)
    }
  }

  Dpad.prototype.emitPress = function(direction) {
    this.emit('press:'+direction, this[direction])
    this.emitCombination()
  }

  Dpad.prototype.emitRelease = function(direction) {
    this.emit('release:'+direction, this[direction])
    this.emitCombination()
  }

  Dpad.prototype.emitCombination = function() {
    this.emit('combination:'+Object.keys(this.currentlyPressed).join('+'))
  }

  return Dpad
})()

module.exports = Dpad