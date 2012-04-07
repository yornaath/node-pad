
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
    
  })

})