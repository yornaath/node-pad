
var Dualshock = require('./src/Dualshock.js')

dualshock = new Dualshock

dualshock.on('connected', function() {
  console.log('Controller connected')
})

dualshock.on('error', function(err) {
  console.log('Controller error:', err)
})

dualshock.on('disconnected', function() {
  console.log('Controller disconnected')
})

/*
dualshock.press('cross', function(pressure) {
  console.log('bashed cross! pressure: ', pressure);
})

dualshock.release('cross', function(pressure) {
  console.log('bashed cross! pressure: ', pressure);
})
*/

dualshock.combo([
  'dpad.down',
  ['dpad.down', 'dpad.right'],
  'square'
], [
  function() { console.log('DOWN') },
  function() { console.log('DOWN RIGHT') },
  function() {
    console.log('HADOUKEN!');
  }
])

dualshock.press(['triangle', 'circle'], function() {
  console.log('triangle AND cirlce pressed');
})

dualshock.combo([
  'cross',
  'cross',
  'square'
], [
  function(pressure) {
    console.log('JAB 1', pressure);
  },
  function(pressure) {
    console.log('JAB 2', pressure);
  },
  function(pressure) {
    console.log('HAYMAKER! ', pressure);
  }
], 1000)

