
Button = require('../src/Button.js')

describe('Button', function() {
  
  describe('property Button.prototype.state', function() {
    it('Should emit a "press" event if going from a falsy to truthy value', function() {
      var self = this,
          button = new Button
      button.state = 0
      button.on('press', function() {
        self.buttonPressed = true
      })
      button.state = 1
      waitsFor(function() {
        return this.buttonPressed
      }, 'Button never emmited "press" event', 100)
      runs(function() {
        expect(this.buttonPressed).toEqual(true)
      })
    })
    it('Should emit a released event if going from a truthy to a falsy value', function() {
      var self = this,
          button = new Button
      button.state = 1
      button.on('release', function() {
        self.buttonReleased = true
      })
      button.state = 0
      waitsFor(function() {
        return this.buttonReleased
      }, 'Button never emmited "release" event', 100)
      runs(function() {
        expect(this.buttonReleased).toEqual(true)
      })
    })
    it('Should not emit a "press" event if going from truthy to truthy state', function() {
      var self = this,
          button = new Button
      button.state = 1
      button.on('press', function() {
        self.buttonPressed = true
      })
      button.state = 1
      waits(20)
      runs(function() {
        expect(this.buttonPressed).toBeFalsy()
      })
    })
    it('Should not emit a "release" event if going from truthy to truthy state', function() {
      var self = this,
          button = new Button
      button.state = 0
      button.on('release', function() {
        self.buttonReleased = true
      })
      button.state = 0
      waits(20)
      runs(function() {
        expect(this.buttonReleased).toBeFalsy()
      })
    })
  })

})