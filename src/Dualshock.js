
var Controller = require('./Controller.js'),
    Button = require('./Button'),
    PressureButton = require('./PressureButton'),
    PressureDpad = require('./PressureDpad'),
    Thumb = require('./Thumb'),
    classextends = require('./classextends')


var Dualshock = (function() {
    
    classextends(Dualshock, Controller)

    function Dualshock() {
      Dualshock.__super__.constructor.apply(this, arguments)
    }

    Dualshock.productName = 'PLAYSTATION(R)3 Controller'

    Dualshock.prototype.layout = {
      'cross': new PressureButton(),
      'square': new PressureButton(),
      'triangle': new PressureButton(),
      'circle': new PressureButton(),
      'l1': new Button(),
      'l2': new Button(),
      'l3': new Button(),
      'r1': new Button(),
      'r2': new Button(),
      'r3': new Button(),
      'lthumb': new Thumb({
        x: 125,
        y: 130,
        deadzone: {
          x: [117, 139],
          y: [120, 140],
        }
      }),
      'rthumb': new Thumb({
        x: 125,
        y: 120,
        deadzone: {
          x: [117, 141],
          y: [110, 132],
        }
      }),
      'dpad': new PressureDpad(),
      'start': new Button(),
      'select': new Button(),
    }

    Dualshock.prototype.dataParser = function(data) {
      this.cross = data[24]
      this.square = data[25]
      this.triangle = data[22]
      this.circle = data[23]
      this.l1 = data[20]
      this.l2 = data[18]
      this.l3 = data[2] === 2 ? 1 : 0
      this.r1 = data[21]
      this.r2 = data[19]
      this.r3 = data[2] === 4 ? 1 : 0 
      this.lthumb.x = data[6]
      this.lthumb.y = data[7]
      this.rthumb.x = data[8]
      this.rthumb.y = data[9]
      this.dpad.up = data[14]
      this.dpad.right = data[15]
      this.dpad.down = data[16]
      this.dpad.left = data[17]
      this.start = data[2] === 8 ? 1 : 0
      this.select = data[2] === 1 ? 1 : 0
    }

    return Dualshock
})()

module.exports = Dualshock


