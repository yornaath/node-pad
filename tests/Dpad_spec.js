


describe('Dpad', function() {
  
  var Dpad = require('../src/Dpad.js')
    
  describe('Dpad.prototype.constructor', function() {
    it('Should create a new Dpad.Button for each direction on the dpad, up, down, left and right', function() {
      var dpad = new Dpad
      expect(dpad.up instanceof dpad.ButtonClass).toEqual(true)
      expect(dpad.down instanceof dpad.ButtonClass).toEqual(true)
      expect(dpad.left instanceof dpad.ButtonClass).toEqual(true)
      expect(dpad.right instanceof dpad.ButtonClass).toEqual(true)
    })
  })

  describe('Dpad.up, Dpad.down, Dpad.left, Dpad.right', function() {
    
    it('Should fire press events when state goes from falsy to truthy', function() {
      var self = this,
          dpad = new Dpad
      dpad.up.on('press', function() {
        self.upPressed = true
      })
      dpad.down.on('press', function() {
        self.downPressed = true
      })
      dpad.left.on('press', function() {
        self.leftPressed = true
      })
      dpad.right.on('press', function() {
        self.rightPressed = true
      })
      dpad.up = 1
      dpad.down = 1
      dpad.left = 1
      dpad.right = 1      
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
          dpad = new Dpad
      dpad.up = 1
      dpad.down = 1
      dpad.left = 1
      dpad.right = 1
      dpad.up.on('release', function() {
        self.upReleased = true
      })
      dpad.down.on('release', function() {
        self.downReleased = true
      })
      dpad.left.on('release', function() {
        self.leftReleased = true
      })
      dpad.right.on('release', function() {
        self.rightReleased = true
      })
      dpad.up = 0
      dpad.down = 0
      dpad.left = 0
      dpad.right = 0
      waits(50)
      runs(function() {
        expect(this.upReleased).toEqual(true)
        expect(this.downReleased).toEqual(true)
        expect(this.leftReleased).toEqual(true)
        expect(this.rightReleased).toEqual(true)
      })
    })

  })

  describe('Dpad events', function() {
    
    describe('"press:" and "release:" events', function() {

      it('Should emit a "press:button" event when a button is pressed', function() {
        var self = this,
            dpad = new Dpad
        dpad.on('press:up', function() {
          self.pressedUp = true
        })
        dpad.on('press:down', function() {
          self.pressedDown = true
        })
        dpad.up = 1
        dpad.up = 0
        dpad.down = 1
        waits(20)
        runs(function() {
          expect(this.pressedUp).toEqual(true)
          expect(this.pressedDown).toEqual(true)
        })
      })

      it('Should emit a "release:button" event when a button is released', function() {
        var self = this,
            dpad = new Dpad
        dpad.on('release:up', function() {
          self.releasedUp = true
        })
        dpad.on('release:down', function() {
          self.releasedDown = true
        })
        dpad.up = 1
        dpad.down = 1
        dpad.up = 0
        dpad.down = 0
        waits(20)
        runs(function() {
          expect(this.releasedUp).toEqual(true)
          expect(this.releasedDown).toEqual(true)
        })
      })

    })

    describe('"combination:" events', function() {
      
      it('Should emit a "combination:button+button" event when severalbuttons is pressed down at the same time', function() {
        var self = this,
            dpad = new Dpad
        dpad.on('combination:left+right', function() {
          self.pressedCombo = true
        })
        dpad.left = 1
        dpad.right = 1
        waitsFor(function() {
          return this.pressedCombo === true
        }, 'dpad never emitted "press:left+right" event', 100)
        runs(function() {
          expect(this.pressedCombo).toEqual(true)
        })
      })

      it('Shouldnt be sensitive to the order of combination buttons', function() {
        var self = this,
            dpad = new Dpad
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

    })

  })

})
























