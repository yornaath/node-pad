
var Thumb = require('../src/Thumb.js')


describe('Thumb', function() {
  
  describe('Properties', function() {
    
    describe('Thumb.prototype.released', function() {
      it('Should be true if the thumbs x and y both are withing their deadzones', function() {
        var self = this,
          thumb = new Thumb({
            x: 10,
            y: 12,
            deadzone: {
              x: [45, 55],
              y: [46, 56]
            }
          })
        expect(thumb.released).toEqual(false)
        thumb.x = 9
        thumb.y = 20
        expect(thumb.released).toEqual(false)
        thumb.x = 50
        thumb.y = 57
        expect(thumb.released).toEqual(false)
        thumb.x = 47
        thumb.y = 52
        expect(thumb.released).toEqual(true)
      })
    })

  })

  describe('Events', function() {
    it('Should fire a "move:x" event when thumb.x value is changes', function() {
      var self = this,
          thumb = new Thumb
      thumb.on('move:x', function(x) {
        self.x = x
        self.changed = true
      })
      thumb.x = 5
      waitsFor(function() {
        return this.changed
      }, 'thumb never fired a "move:x" event', 100)
      runs(function() {
        expect(this.x).toEqual(5)
      })
    })

    it('Should fire a "move:y" event when thumb.y value is changes', function() {
      var self = this,
          thumb = new Thumb
      thumb.on('move:y', function(y) {
        self.y = y
        self.changed = true
      })
      thumb.y = 5
      waitsFor(function() {
        return this.changed
      }, 'thumb never fired a "move:y" event', 100)
      runs(function() {
        expect(this.y).toEqual(5)
      })
    })

    it('Should not fire a "move: x or y" event if thumb.x or thumb.y is set toe the same value as it was', function() {
      var self = this,
          thumb = new Thumb
      thumb.on('move:y', function(y) {
        self.ychanged = true
      })
      thumb.on('move:x', function(x) {
        self.xchanged = true
      })
      thumb.y = 0
      thumb.x = 0
      thumb.y = 0
      thumb.x = 0
      waits(30)
      runs(function() {
        expect(this.xchanged).toBeFalsy()
        expect(this.ychanged).toBeFalsy()
      })
    })

    it('Should not fire move: x or y  events if the new state is within the deadzone boundaries', function() {
      var self = this,
          thumb = new Thumb({
            deadzone: {
              x: [45, 55],
              y: [46, 56]
            }
          })
      thumb.y = 20
      thumb.x = 23
      thumb.on('move:y', function(y) {
        self.ychanged = true
      })
      thumb.on('move:x', function(x) {
        self.xchanged = true
      })
      thumb.y = 50
      thumb.x = 52
      waits(30)
      runs(function() {
        expect(this.xchanged).toBeFalsy()
        expect(this.ychanged).toBeFalsy()
      })
    })

    it('Should fire a "release" event when going from outside of deadzone to inside deadzone if the thumb has deadzones', function() {
      var self = this,
          thumb = new Thumb({
            x: 10,
            y: 12,
            deadzone: {
              x: [45, 55],
              y: [46, 56]
            }
          })
      expect(thumb.x).toEqual(10)
      expect(thumb.y).toEqual(12)
      thumb.on('release', function() {
        self.releasedThumb = true
      })
      thumb.x = 50
      thumb.y = 51
      waitsFor(function() {
        return this.releasedThumb === true
      }, 'thumb never emitted "release" event', 100)
      runs(function() {
        expect(this.releasedThumb).toEqual(true)
      })
    })
  
  })

})
















