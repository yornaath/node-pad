(function() {
  var Controller, HID, events;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  }, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  events = require("events");
  HID = require("../node-modules/node-hid/src/HID");
  Controller = (function() {
    __extends(Controller, events.EventEmitter);
    function Controller() {
      this.state = this.layout;
      this.previousState = this.state;
      this.init();
    }
    Controller.prototype.init = function() {
      return setTimeout(__bind(function() {
        var devicePath;
        devicePath = this.getDevicePath();
        if (devicePath) {
          this.hid = new HID.HID(devicePath);
          this.emit('connected');
          this.on('error', __bind(function(msg) {
            this.emit('disconnected');
            this.stopReadingHID();
            return this.init();
          }, this));
          return this.startReadingHID();
        } else {
          return this.init();
        }
      }, this), 200);
    };
    Controller.prototype.setState = function(state) {
      this.previousState = this.state;
      this.state = state;
      if (this.stateHasChanged()) {
        return this.emit('statechange', this.state);
      }
    };
    Controller.prototype.stateHasChanged = function() {
      if (Controller.compare(this.state, this.previousState)) {
        return false;
      } else {
        return true;
      }
    };
    Controller.prototype.getDevicePath = function() {
      var device, devices, _i, _len;
      devices = HID.devices();
      for (_i = 0, _len = devices.length; _i < _len; _i++) {
        device = devices[_i];
        if (device.product && device.product.toLowerCase() === this.productName.toLowerCase()) {
          return device.path;
        }
      }
    };
    Controller.prototype.startReadingHID = function(HIDState) {
      var firstRead, reader;
      firstRead = 1;
      reader = __bind(function(error, data) {
        if (error) {
          this.emit('error', error);
        } else {
          this.setState(this.processHIDData(data));
          if (firstRead > 0) {
            this.emit('on');
            firstRead = 0;
          }
        }
        if (this.isReading) {
          return setTimeout(__bind(function() {
            return this.hid.read(reader);
          }, this), 5);
        }
      }, this);
      this.isReading = 1;
      return this.hid.read(reader);
    };
    Controller.prototype.stopReadingHID = function() {
      return this.isReading = 0;
    };
    Controller.prototype.processHIDData = function(HIDData) {
      return HIDData;
    };
    Controller.compare = function(obj, cand) {
      return (JSON.stringify(obj)) === (JSON.stringify(cand));
    };
    return Controller;
  })();
  module.exports = Controller;
}).call(this);
