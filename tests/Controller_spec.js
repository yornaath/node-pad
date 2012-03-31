(function() {
  var Controller, layout;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  Controller = require("../lib/Controller.js");
  layout = {
    button1: 0,
    button2: 0,
    dpad: {
      up: 0,
      down: 0,
      left: 0,
      right: 0
    }
  };
  describe("Controller", function() {
    describe("constructor", function() {
      return it("Should set layout on controller from the given layout argument", function() {
        var EController, controller;
        EController = (function() {
          __extends(EController, Controller);
          function EController() {
            EController.__super__.constructor.apply(this, arguments);
          }
          EController.prototype.layout = layout;
          return EController;
        })();
        controller = new EController;
        return expect(controller.layout === layout).toBeTruthy();
      });
    });
    describe("stateHasChanged", function() {
      return it("Should return true if state is different from previousState, false if else", function() {
        var EController, controller;
        EController = (function() {
          __extends(EController, Controller);
          function EController() {
            EController.__super__.constructor.apply(this, arguments);
          }
          EController.prototype.layout = layout;
          return EController;
        })();
        controller = new EController;
        controller.state = {
          button1: 0,
          button2: 0
        };
        controller.previousState = {
          button1: 0,
          button2: 1
        };
        return expect(controller.stateHasChanged()).toEqual(true);
      });
    });
    return describe("setState", function() {
      it("Should set controller.state to the new state", function() {
        var EController, controller, state;
        EController = (function() {
          __extends(EController, Controller);
          function EController() {
            EController.__super__.constructor.apply(this, arguments);
          }
          EController.prototype.layout = layout;
          return EController;
        })();
        controller = new EController;
        expect(controller.state === layout).toBeTruthy();
        state = {
          button1: 1,
          button2: 0,
          dpad: {
            up: 0,
            down: 2,
            left: 0,
            right: 0
          }
        };
        controller.setState(state);
        return expect(controller.state === state).toBeTruthy();
      });
      it("Should emit a 'statechange' event if new state is different than the previous", function() {
        var EController, controller, self;
        self = this;
        EController = (function() {
          __extends(EController, Controller);
          function EController() {
            EController.__super__.constructor.apply(this, arguments);
          }
          EController.prototype.layout = {
            button1: 0,
            button2: 0
          };
          return EController;
        })();
        controller = new EController;
        controller.on('statechange', function(state) {
          self.newState = state;
          return self.statechangeEventFired = true;
        });
        controller.setState({
          button1: 0,
          button2: 1
        });
        waitsFor(function() {
          return self.statechangeEventFired === true;
        }, 'statechange event never fired', 200);
        return runs(function() {
          expect(this.statechangeEventFired).toEqual(true);
          expect(this.newState['button1']).toEqual(0);
          return expect(this.newState['button2']).toEqual(1);
        });
      });
      describe("map", function() {
        var EController, controller;
        EController = (function() {
          __extends(EController, Controller);
          function EController() {
            EController.__super__.constructor.apply(this, arguments);
          }
          EController.prototype.layout = {
            button1: 0,
            button2: 0,
            dpad: {
              up: 0,
              down: 0,
              right: 0,
              left: 0
            }
          };
          return EController;
        })();
        controller = null;
        return beforeEach(function() {
          return controller = new EController;
        });
      });
      return describe("pressed", function() {
        var EController, controller;
        EController = (function() {
          __extends(EController, Controller);
          function EController() {
            EController.__super__.constructor.apply(this, arguments);
          }
          EController.prototype.layout = {
            button1: 0,
            button2: 0,
            dpad: {
              up: 0,
              down: 0,
              right: 0,
              left: 0
            }
          };
          return EController;
        })();
        controller = null;
        beforeEach(function() {
          return controller = new EController;
        });
        return it("Should map a pressed event to the given button, and fire the callback upon pressed", function() {
          var self;
          self = this;
          controller.press('button1', function() {
            return self.button1Pressed = true;
          });
          controller.setState({
            button1: 1,
            button2: 0,
            dpad: {
              up: 0,
              down: 0,
              right: 0,
              left: 0
            }
          });
          waitsFor(function() {
            if (this.button1Pressed) {
              return true;
            } else {
              return false;
            }
          }, 'button1 never pressed', 100);
          return runs(function() {
            return expect(this.button1Pressed).toEqual(true);
          });
        });
      });
    });
  });
}).call(this);
