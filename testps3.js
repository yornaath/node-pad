
var Dualshock = require('./src/Dualshock.js')

dualshock = new Dualshock

dualshock.on('connected', function() {
  console.log('conn')
})