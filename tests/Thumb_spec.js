
var Thumb = require('../src/Thumb.js')


describe('Thumb', function() {
  
  it('Should fire a "x:change" event when thumb.x value is changes', function() {
    var self = this,
        thumb = new Thumb
    thumb.on('x:change', function(x) {
      self.x = x
      self.changed = true
    })
    thumb.x = 5
    waitsFor(function() {
      return this.changed
    }, 'thumb never fired a "x:change" event', 100)
    runs(function() {
      expect(this.x).toEqual(5)
    })
  })

  it('Should fire a "y:change" event when thumb.y value is changes', function() {
    var self = this,
        thumb = new Thumb
    thumb.on('y:change', function(y) {
      self.y = y
      self.changed = true
    })
    thumb.y = 5
    waitsFor(function() {
      return this.changed
    }, 'thumb never fired a "y:change" event', 100)
    runs(function() {
      expect(this.y).toEqual(5)
    })
  })

  it('Should not fire a "x or y :change" event if thumb.x or thumb.y is set toe the same value as it was', function() {
    var self = this,
        thumb = new Thumb
    thumb.on('y:change', function(y) {
      self.ychanged = true
    })
    thumb.on('x:change', function(x) {
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

})