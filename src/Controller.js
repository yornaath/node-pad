
var events = require("events"),
    classextends = require('./classextends'),
    HID = require("../node-modules/node-hid/src/HID")

var Controller

Controller = (function() {

  classextends(Controller, events.EventEmitter)
  
  function Controller() {
    this.state = this.layout
    this.previousState = this.state
    this.buttonPressHistory = []
    this.buttonPatterns = this.parseLayout()
    this.buttonPatterns.forEach((function(buttonPattern) {
      var buttonValue = 0
      this.on('change:'+buttonPattern, function(newValue) {
        newValue > 0 && buttonValue === 0 ? this.emit('press:'+buttonPattern, newValue) :
        buttonValue > 0 && newValue === 0 ? this.emit('release:'+buttonPattern, newValue) :
                                            void 0
        buttonValue = newValue
      })
      this.on('press:'+buttonPattern, function(buttonValue) {
        if(this.buttonPressHistory.length > 120) {
          this.buttonPressHistory.splice(0,60)
        }
        this.buttonPressHistory.push(buttonPattern)
        this.emit('press:', buttonPattern, buttonValue)
      })
    }).bind(this))
    this.init()
  }

  Controller.prototype.init = function() {
    return setTimeout((function() {
      var devicePath
      devicePath = this.getDevicePath()
      if (devicePath) {
        this.hid = new HID.HID(devicePath)
        this.emit('connected')
        this.on('error', (function(msg) {
          this.emit('disconnected')
          this.stopReadingHID()
          return this.init()
        }).bind(this))
        return this.startReadingHID()
      } else {
        return this.init()
      }
    }).bind(this), 200)
  }

  Controller.prototype.setState = function(state) {
    var button, stateChanges, value
    this.previousState = this.state
    this.state = state
    stateChanges = this.getStateChanges()
    if (stateChanges) {
      for (button in stateChanges) {
        value = stateChanges[button]
        this.emit('change:'+button, value)
      }
    }
  }

  Controller.prototype.getDevicePath = function() {
    var device, devices, i, len
    devices = HID.devices()
    for (i = 0, len = devices.length; i < len; i++) {
      device = devices[i]
      if (device.product && device.product.toLowerCase() === this.productName.toLowerCase()) {
        return device.path
      }
    }
  }

  Controller.prototype.startReadingHID = function(HIDState) {
    var firstRead, reader
    firstRead = 1
    reader = (function(error, data) {
      if (error) {
        this.emit('error', error)
      } else {
        this.setState(this.processHIDData(data))
        if (firstRead > 0) {
          this.emit('on')
          firstRead = 0
        }
      }
      if (this.isReading) {
        return setTimeout((function() {
          return this.hid.read(reader)
        }).bind(this), 5)
      }
    }).bind(this)
    this.isReading = 1
    return this.hid.read(reader)
  }

  Controller.prototype.stopReadingHID = function() {
    return this.isReading = 0
  }

  Controller.prototype.processHIDData = function(HIDData) {
    return HIDData
  }

  Controller.prototype.press = function(pattern, callback) {
    this.on('press:'+pattern, callback)
  }

  Controller.prototype.release = function(pattern, callback) {
    this.on('release:'+pattern, callback)
  }

  Controller.prototype.ifNext = function(buttonpPatternCheck, then, elseDo) {
    this.once('press:', function(buttonPattern, buttonValue) {
      buttonpPatternCheck === buttonPattern ? 
        typeof then === 'function' ? then.call(this, buttonValue) : void 0
      : typeof elseDo === 'function' ? elseDo.call(this, buttonValue) : void 0
    }) 
  }

  Controller.prototype.combo = function(comboPattern, callbacks) {
    var self, args, i, button, next
    self = this
    args = arguments
    i = 0
    next = function() {
      typeof callbacks[i] === 'function' ? callbacks[i].call(this, arguments) : void 0
      i++
      button = comboPattern[i]
      if(button) {
        this.ifNext(button, next, function() {
          this.combo(comboPattern, callbacks)
        })
      } else {
        this.combo(comboPattern, callbacks)
      }
    }
    this.once('press:'+comboPattern[i], next)
  }

  Controller.prototype.getStateChanges = function() {
    var changes, haschanges, recurse
    haschanges = false
    changes = {}
    recurse = function(o, oo, keystring) {
      var key, val, results
      results = []
      for (key in o) {
        val = o[key]
        results.push(typeof val === 'object' ? recurse(val, oo[key], "" + keystring + "." + key) : val !== oo[key] ? (haschanges = true, changes[("" + keystring + "." + key).replace(/\./, '')] = val) : void 0)
      }
      return results
    }
    recurse(this.state, this.previousState, "")
    if (haschanges) {
      return changes
    }
    return false
  }

  Controller.prototype.parseLayout = function() {
    var recurse, strings
    strings = []
    recurse = function(o, keystring) {
      var key, results, keystring
      for(key in o) {
        typeof o[key] === 'object' ? recurse(o[key], keystring + '.' + key) :
                                     strings.push((keystring + '.' + key).replace(/\./, ''))
      }
    }
    recurse(this.layout, '')
    return strings
  }

  Controller.compare = function(obj, cand) {
    return (JSON.stringify(obj)) === (JSON.stringify(cand))
  }

  return Controller
})()

module.exports = Controller

