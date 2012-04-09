
var events = require("events"),
    classextends = require('./classextends'),
    HID = require("node-hid")

var PortController

PortController = (function() {

  classextends(PortController, events.EventEmitter)
  
  function PortController(options) {
    if(typeof options === 'object') {
      options.maxPlayers ? this.maxPlayers = options.maxPlayers : null
    }
    this.on('devices', this.parseDevices.bind(this))
    this.on('connectedControllerDevice', this.connectControllerDevice.bind(this))
    this.startPollingForDevices()
  }

  Object.defineProperty(PortController, 'pollDeviceIntervalTime', {
    value: 200,
    configurable: false,
    writable: true
  })

  Object.defineProperty(PortController.prototype, 'maxPlayers', {
    value: 4,
    configurable: false,
    writable: true
  })

  Object.defineProperty(PortController.prototype, 'connectedControllers', {
    value: {},
    configurable: false,
    writable: false
  })

  PortController.prototype.parseDevices = function(devices) {
    if(Object.keys(this.connectedControllers).length < this.maxPlayers) {
      devices.forEach((function(device) {
        if(typeof device === 'object' && device.product.toLowerCase() === this.Controller.productName.toLowerCase()) {
          if(!(device.path in this.connectedControllers)) {
            this.emit('connectedControllerDevice', device)
          }
        }
      }).bind(this))
    }
  }

  PortController.prototype.connectControllerDevice = function(controllerDevice) {
    var self = this,
        device,
        controller = new this.Controller
    HIDDevice = new HID.HID(controllerDevice.path)
    if(HIDDevice) {
      controller.HIDDevice = HIDDevice
      controller.startReadingHID()
      this.connectedControllers[controllerDevice.path] = controller
      controller.on('disconnect', function() {
        delete self.connectedControllers[controllerDevice.path]
      })
      this.emit('connect', controller)
    } 
  }

  PortController.prototype.startPollingForDevices = function() {
    if(!this.pollInterval) {
      this.pollInterval = setInterval((function() {
        this.emit('devices', this.getDevices())
      }).bind(this), PortController.pollDeviceIntervalTime) 
    }
  }

  PortController.prototype.stopPollingForDevices = function() {
    if(this.pollInterval) {
      clearInterval(this.pollInterval)
    }
  }

  PortController.prototype.getDevices = function() {
    return HID.devices()
  }

  return PortController
})()

module.exports = PortController