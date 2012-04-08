
var PortController = require('../src/PortController')

describe('PortController', function() {
  
  describe('PortController.prototype.constructor', function() {
    


  })

  describe('PortController.prototype.startPollingForDevices', function() {
    it('Should start a interval where it emits a "devices" event with the returned value from PortController.prototype.getDevices', function() {
      var PortController = require('../src/PortController'),
          portController,
          self = this,
          i = 1
      self.polls = []
      PortController.pollDeviceIntervalTime = 200
      PortController.prototype.getDevices = function() {
        var fakeDevices = []
        for(var k = i; k !== 0; k--)
          fakeDevices.push(1)
        i++
        return fakeDevices
      }
      portController = new PortController
      portController.on('devices', function(devices) {
        self.polls.push(devices)
      })
      portController.startPollingForDevices()
      waits(650)
      runs(function() {
        portController.stopPollingForDevices()
        expect(this.polls.length).toEqual(3)
        expect(this.polls[0].length).toEqual(1)
        expect(this.polls[1].length).toEqual(2)
        expect(this.polls[2].length).toEqual(3)
      })
    })
  })

  describe('', function() {
    it('should', function() {
      var PortController = require('../src/PortController'),
          currentDevices = []
      PortController.prototype.getDevices = function() {
        return currentDevices
      }
    })
  })

})