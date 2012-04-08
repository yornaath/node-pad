
var Controller = require('../src/Controller.js'),
    Button = require('../src/Button.js'),
    Thumb = require('../src/Thumb.js'),
    Dpad = require('../src/Dpad.js'),
    classextends = require('../src/classextends')


var ExtendedController = (function() {
    
    classextends(ExtendedController, Controller)

    function ExtendedController() {
      ExtendedController.__super__.constructor.apply(this, arguments)
    }

    ExtendedController.prototype.layout = {
      'a': new Button(),
      'b': new Button(),
      'thumb': new Thumb({
        deadzone: {
          x: [49, 51],
          y: [49, 51]
        }
      }),
      'dpad': new Dpad()
    }

    return ExtendedController
})()

describe('Controller', function() {
  
  describe('Controller.prototype.constructor', function() {
    it('Should parse the Controller.prototype.layout object and create properties on the Controller instance, named by the key', function() {
      var controller = new ExtendedController
      expect(controller.a instanceof Button).toEqual(true)
      expect(controller.b instanceof Button).toEqual(true)
      expect(controller.thumb instanceof Thumb).toEqual(true)
      expect(controller.dpad instanceof Dpad).toEqual(true)
    })
  })

  describe('Controller properties', function() {
    it('Should set the state on the controller element when assigned and fire events acordingly', function() {
      var controller = new ExtendedController,
          i = 0,
          self = this
      controller.a.on('press', function() { self.apressed = true; i++ })
      controller.b.on('press', function() { self.apressed = true; i++ })
      controller.thumb.on('move', function() { self.thumbmoved = true; i++ })
      controller.dpad.up.on('press', function() { self.uppressed = true; i++ })
      controller.dpad.down.on('press', function() { self.downpressed = true; i++ })
      controller.dpad.left.on('press', function() { self.leftpressed = true; i++ })
      controller.dpad.right.on('press', function() { self.rightpressed = true; i++ })
      controller.a = 0
      controller.b = 0
      controller.thumb = 0
      controller.dpad.up = 0
      controller.dpad.down = 0
      controller.dpad.left = 0
      controller.dpad.right = 0
      controller.a = 1
      controller.b = 1
      controller.thumb.x = 10
      controller.dpad.up = 1
      controller.dpad.down = 1
      controller.dpad.left = 1
      controller.dpad.right = 1
      waitsFor(function() {
        return i === 7
      }, 'All events didnt fire', 100)
      runs(function() {
        expect(this.apressed).toEqual(true)
        expect(this.apressed).toEqual(true)
        expect(this.thumbmoved).toEqual(true)
        expect(this.uppressed).toEqual(true)
        expect(this.downpressed).toEqual(true)
        expect(this.leftpressed).toEqual(true)
        expect(this.rightpressed).toEqual(true)
      })
    })
  })

})