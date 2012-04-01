


describe('PressureDpad', function() {

  var PressureDpad = require('../src/PressureDpad.js')

  describe('PressureDpad.up, PressureDpad.down, PressureDpad.left, PressureDpad.right', function() {
    
    it('Should fire press events when state goes from falsy to truthy', function() {
      var self = this,
          pressureDpad = new PressureDpad
      pressureDpad.up.on('press', function() {
        self.upPressed = true
      })
      pressureDpad.down.on('press', function() {
        self.downPressed = true
      })
      pressureDpad.left.on('press', function() {
        self.leftPressed = true
      })
      pressureDpad.right.on('press', function() {
        self.rightPressed = true
      })
      pressureDpad.up = 1
      pressureDpad.down = 1
      pressureDpad.left = 1
      pressureDpad.right = 1      
      waits(50)
      runs(function() {
        expect(this.upPressed).toEqual(true)
        expect(this.downPressed).toEqual(true)
        expect(this.leftPressed).toEqual(true)
        expect(this.rightPressed).toEqual(true)
      })
    })

    it('Should fire release events when state goes from falsy to truthy', function() {
      var self = this,
          pressureDpad = new PressureDpad
      pressureDpad.up = 1
      pressureDpad.down = 1
      pressureDpad.left = 1
      pressureDpad.right = 1
      pressureDpad.up.on('release', function() {
        self.upReleased = true
      })
      pressureDpad.down.on('release', function() {
        self.downReleased = true
      })
      pressureDpad.left.on('release', function() {
        self.leftReleased = true
      })
      pressureDpad.right.on('release', function() {
        self.rightReleased = true
      })
      pressureDpad.up = 0
      pressureDpad.down = 0
      pressureDpad.left = 0
      pressureDpad.right = 0
      waits(50)
      runs(function() {
        expect(this.upReleased).toEqual(true)
        expect(this.downReleased).toEqual(true)
        expect(this.leftReleased).toEqual(true)
        expect(this.rightReleased).toEqual(true)
      })
    })

    it('Should fire "pressurechange" events when pressure changes', function() {
      var self = this,
          pressureDpad = new PressureDpad
      this.pressureChanges = {
        up: [],
        down: [],
        left: [],
        right: []
      }
      pressureDpad.up.on('pressurechange', function(pressure) {
        self.pressureChanges['up'].push(pressure)
      })
      pressureDpad.down.on('pressurechange', function(pressure) {
        self.pressureChanges['down'].push(pressure)
      })
      pressureDpad.left.on('pressurechange', function(pressure) {
        self.pressureChanges['left'].push(pressure)
      })
      pressureDpad.right.on('pressurechange', function(pressure) {
        self.pressureChanges['right'].push(pressure)
      })
      pressureDpad.up = 1
      pressureDpad.down = 1
      pressureDpad.left = 1
      pressureDpad.right = 1
      pressureDpad.up = 2
      pressureDpad.down = 2
      pressureDpad.left = 2
      pressureDpad.right = 2
      pressureDpad.up = 3
      pressureDpad.down = 3
      pressureDpad.left = 3
      pressureDpad.right = 3
      waits(50)
      runs(function() {
        expect(this.pressureChanges['up'][0]).toEqual(1)
        expect(this.pressureChanges['down'][0]).toEqual(1)
        expect(this.pressureChanges['left'][0]).toEqual(1)
        expect(this.pressureChanges['right'][0]).toEqual(1)
        expect(this.pressureChanges['up'][1]).toEqual(2)
        expect(this.pressureChanges['down'][1]).toEqual(2)
        expect(this.pressureChanges['left'][1]).toEqual(2)
        expect(this.pressureChanges['right'][1]).toEqual(2)
        expect(this.pressureChanges['up'][2]).toEqual(3)
        expect(this.pressureChanges['down'][2]).toEqual(3)
        expect(this.pressureChanges['left'][2]).toEqual(3)
        expect(this.pressureChanges['right'][2]).toEqual(3)
      })
    })

  })

  describe('"combination:" events', function() {
      
      it('Should emit a "combination:button+button" event when severalbuttons is pressed down at the same time', function() {
        var self = this,
            dpad = new PressureDpad
        dpad.on('combination:left+right', function() {
          self.pressedCombo = true
        })
        dpad.left = 1
        dpad.right = 1
        waitsFor(function() {
          return this.pressedCombo === true
        }, 'dpad never emitted "combination:left+right" event', 100)
        runs(function() {
          expect(this.pressedCombo).toEqual(true)
        })
      })

      it('Shouldnt be sensitive to the order of combination buttons', function() {
        var self = this,
            dpad = new PressureDpad
        this.timesFired = 0
        dpad.on('combination:up+down+left', function() {
          self.comboOneFired = true
          self.timesFired++
        })
        dpad.on('combination:down+up+left', function() {
          self.comboTwoFired = true
          self.timesFired++
        })
        dpad.on('combination:left+down+up', function() {
          self.comboThreeFired = true
          self.timesFired++
        })
        dpad.up = 1
        dpad.down = 1
        dpad.left = 1

        dpad.up = 0
        dpad.down = 0
        dpad.left = 0

        dpad.down = 1
        dpad.up = 1
        dpad.left = 1

        dpad.up = 0
        dpad.down = 0
        dpad.left = 0

        dpad.down = 1
        dpad.left = 1
        dpad.up = 1

        waitsFor(function() {
          return this.timesFired === 9
        }, 'combination of up and down event didnt fire as many times as it should', 50)
        runs(function() {
          expect(this.timesFired === 9).toEqual(true)
          expect(this.comboOneFired).toEqual(true)
          expect(this.comboTwoFired).toEqual(true)
          expect(this.comboThreeFired).toEqual(true)
        })
      })

      it('Should get the average pressure as argument', function() {
        var self = this,
            dpad = new PressureDpad
        dpad.on('combination:down+right+left', function(pressure) {
          self.averagePressure = pressure
        })
        dpad.right = 3
        dpad.down = 7
        dpad.left = 20
        waitsFor(function() {
          return typeof this.averagePressure !== 'undefined'
        }, 'Combination event never fired', 50)
        runs(function() {
          expect(this.averagePressure).toEqual(10)
        })
      })

    })

})




