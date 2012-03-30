(function() {
  var Controller, Dualshock;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  Controller = require("./Controller");
  Dualshock = (function() {
    __extends(Dualshock, Controller);
    function Dualshock() {
      Dualshock.__super__.constructor.apply(this, arguments);
    }
    Dualshock.prototype.productName = 'PLAYSTATION(R)3 Controller';
    Dualshock.prototype.layout = {
      cross: 0,
      square: 0,
      triangle: 0,
      circle: 0,
      lthumb: {
        x: 0,
        y: 0,
        down: 0
      },
      rthumb: {
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
      r: {
        1: 0,
        2: 0
      },
      l: {
        1: 0,
        2: 0
      },
      start: 0,
      select: 0
    };
    Dualshock.prototype.processHIDData = function(data) {
      return {
        cross: data[24],
        square: data[25],
        triangle: data[22],
        circle: data[23],
        lthumb: {
          x: data[6],
          y: data[7],
          down: data[2] === 2 ? 1 : 0
        },
        rthumb: {
          x: data[8],
          y: data[9],
          down: data[2] === 4 ? 1 : 0
        },
        dpad: {
          up: data[14],
          right: data[15],
          down: data[16],
          left: data[17]
        },
        r: {
          1: data[21],
          2: data[19]
        },
        l: {
          1: data[20],
          2: data[18]
        },
        start: data[2] === 8 ? 1 : 0,
        select: data[2] === 1 ? 1 : 0
      };
    };
    return Dualshock;
  })();
}).call(this);
