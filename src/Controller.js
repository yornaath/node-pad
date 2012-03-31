
var events = require("events"),
    classextends = require('./classextends'),
    HID = require("../node-modules/node-hid/src/HID")

var Controller

Controller = (function() {

  classextends(Controller, events.EventEmitter)
  
  function Controller() {
    this.state = this.layout
    this.previousState = this.state
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
    var button, stateChanges, value, results
    this.previousState = this.state
    this.state = state
    stateChanges = this.getStateChanges()
    if (stateChanges) {
      results = []
      for (button in stateChanges) {
        value = stateChanges[button]
        results.push(this.emit(button, value))
      }
      return results
    }
  }

  Controller.prototype.stateHasChanged = function() {
    if (Controller.compare(this.state, this.previousState)) {
      return false
    } else {
      return true
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
        return setTimeout(__bind(function() {
          return this.hid.read(reader)
        }, this), 5)
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
    var source
    pattern = pattern.split('.')
    return source = JSON.stringify(pattern).replace(/,/g, '][')
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

  Controller.compare = function(obj, cand) {
    return (JSON.stringify(obj)) === (JSON.stringify(cand))
  }

  return Controller
})()

module.exports = Controller

