# node-stick
Is a library for using game controllers with nodejs. Currently only the dualshock 3 is supported, but support for xbox360 controller is planned for a future release.

### Dualshock 3

#### Connecting
```javascript
var Dualshock = require('node-stick').Dualshock

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
```

#### Mapping buttons
```javascript
dualshock.press('cross', function(pressure) {
  console.log('bashed cross! pressure: ', pressure);
})

dualshock.release('cross', function() {
  console.log('release cross!');
})
```

#### Mapping button combinations
```javascript
dualshock.press(['circle', 'triangle'], grab)
dualshock.press(['dpad.up', 'circle'], jumpKick)
```

#### Combo series
```javascript
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
```

```javascript
dualshock.combo([
  'dpad.left',
  'dpad.left',
  'triangle'
], [
  null,
  startRunningLeft,
  runningSlideKick
])
```

```javascript
dualshock.combo([
  'dpad.down',
  ['dpad.down', 'dpad.right'],
  'square'
], [
  null,
  null,
  hadouken
])
```







