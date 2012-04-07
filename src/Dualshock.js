



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
        deadzone: {
          x: [126, 128],
          x: [126, 128],
        }
      }),
      'rthumb': new Thumb({
        deadzone: {
          x: [126, 128],
          x: [126, 128],
        }
      }),
      'dpad': new PressureDpad(),
      'start': new Button(),
      'select': new Button(),
    }

    return Dualshock
})()

module.exports = Dualshock

/*
var Controller = require("./Controller"),
    classextends = require('./classextends')

var Dualshock

Dualshock = (function() {
  
  classextends(Dualshock, Controller)
  
  function Dualshock() {
    Dualshock.__super__.constructor.apply(this, arguments)
  }

  Dualshock.prototype.productName = 'PLAYSTATION(R)3 Controller'

  Dualshock.prototype.layout = {
    cross: 0,
    square: 0,
    triangle: 0,
    circle: 0,
    lstick: {
      x: 0,
      y: 0,
      down: 0
    },
    rstick: {
      x: 0,
      y: 0,
      down: 0
    },
    dpad: {
      up: 0,
      right: 0,
      down: 0,
      left: 0
    },
    r1: 0,
    r2: 0,
    l1: 0,
    l2: 0,
    start: 0,
    select: 0
  }

  Dualshock.prototype.processHIDData = function(data) {
    return {
      cross: data[24],
      square: data[25],
      triangle: data[22],
      circle: data[23],
      lstick: {
        x: data[6] || 1,
        y: data[7] || 1,
        down: data[2] === 2 ? 1 : 0
      },
      rstick: {
        x: data[8] || 1,
        y: data[9] || 1,
        down: data[2] === 4 ? 1 : 0
      },
      dpad: {
        up: data[14],
        right: data[15],
        down: data[16],
        left: data[17]
      },
      r1: data[21],
      r2: data[19],
      l1: data[20],
      l2: data[18],
      start: data[2] === 8 ? 1 : 0,
      select: data[2] === 1 ? 1 : 0
    }
  }

  return Dualshock
})()
*/

