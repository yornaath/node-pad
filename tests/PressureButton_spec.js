
var PressureButton = require('../src/PressureButton.js')

describe('PressureButton', function() {
  
  describe('property PressureButton.prototype.pressure', function() {
    it('Should get as the same value as PressurButton.state', function() {
      button = new PressureButton
      button.state = 10
      expect(button.pressure).toEqual(10)
      button.state = 101
      expect(button.pressure).toEqual(101)
      button.state = 0
      expect(button.pressure).toEqual(0)
    })
    it('Should not be possible to set pressure directly', function() {
      button = new PressureButton
      button.pressure = 10
      expect(button.pressure).toBeFalsy()
    })
  })

  describe('event "press"', function() {
    it('Should be fired when going from falsy to truthy state, and pass pressure as parameter the the handler', function() {
      var self = this,
          button = new PressureButton
      button.state = 0
      button.on('press', function(pressure) {
        self.pressure = pressure
        self.pressed = true
      })
      button.state = 56
      waitsFor(function() {
        return this.pressed === true
      }, '"press" event never fired', 100)
      runs(function() {
        expect(this.pressure).toEqual(56)
      })
    })
  })

  describe('event "pressurechange"', function() {
    it('Should fire everytime the button changes state value', function() {
      var self = this,
          button = new PressureButton
      this.changes = []
      button.state = 0
      button.on('pressurechange', function(pressure) {
        self.changes.push(pressure)
      })
      button.state = 10
      button.state = 12
      button.state = 24
      button.state = 90
      button.state = 0
      waitsFor(function() {
        return this.changes.length === 5
      }, 'number "pressurechange" events never reached number of actual changes', 200)
      runs(function() {
        expect(this.changes[0]).toEqual(10)
        expect(this.changes[1]).toEqual(12)
        expect(this.changes[2]).toEqual(24)
        expect(this.changes[3]).toEqual(90)
        expect(this.changes[4]).toEqual(0)
      })
    })
  })

})