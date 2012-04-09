# node-pad
Is a library for using game controllers with nodejs. Currently only the dualshock 3 is supported, but support for xbox360 controller is planned for a future release.

##Installation
Easy install using npm  

```
npm install node-pad
```
Beware it uses a third party node module with c++ bindings to communicate with hid devices and is not guaranteed to work on your system.

### Preview
First, some taster code. Just to blow your mind.  

```javascript
var dualshock3 = require('node-pad').dualshock3

dualshock3.on('connect', function(controller) {

  var player = game.createPlayer()
  
  controller.on('join', function(){
    
    player.joinGame()

    controller.lthumb.on('move', function(event){
      player.moveInDirection({
        x: event.x,
        y: event.y
      })
    })

    controller.lthumb.on('release', function(){
      player.stopMoving()
    })

    controller.rthumb.on('move', function(event){
      player.updateCameraDirection({
        x: event.x,
        y: event.y
      })
    })
    
    controller.rthumb.on('release', function(){
      player.stopCamera()
    })
    
    controller.r2.on('press', function(){
      player.fireWeapon()
    })
    
    controller.l2.on('press', function(pressure){
      player.throwGrenade(pressure)
    })
    
    controller.cross.on('press', function(pressure){
      player.jump(pressure)
    })
    
    controller.l3.on('press', function(){
      player.enterCrouchingPosition()
    })
    
    controller.l3.on('release', function(){
      player.leaveCrouchingPosition()
    })

  })

  controller.on('disconnect', function(){
    player.exitGame()
  })
})
```

## Connecting controllers
The nodepad module fires a ```connect``` event on the coresponding controller type when a new controller is plugged in.  

```javascript
nodepad.dualshock3.on('connect', function(controller){
  // controller object is available
})
```

In the case of the dualshock3 there is an additional event ```join``` that is fired when a controlle is connected and has started to send data. Sometimes it starts right away and sometimes it waits for the ps button to get pressed. This has to be figured out in a future release.  

```javascript
nodepad.dualshock3.on('connect', function(controller){
  controller.on('join', function(){
    // Bind events
  })
})
```

## controller object
The controller object has buttons, dpads and thumbs(sticks) that you can bind events to. What kind of elements it has depend on the controller layout and naming.  

### dualshock3
The dualshock3 controller object has this layout:

#### cross, square, circle, triangle
These buttons are pressure sensitive and emits the followin events:  

```javascript
controller.button.emit('press', pressure)
controller.button.emit('release')
controller.button.emit('pressurechange', newpressure)
```

#### r1, r2, l1, l2
These buttons are pressure sensitive and emits the followin events:  

```javascript
controller.button.emit('press', pressure)
controller.button.emit('release')
controller.button.emit('pressurechange', newpressure)
```

#### r3, l3
These are buttons and emits the followin events:  

```javascript
controller.button.emit('press', pressure)
controller.button.emit('release')
```

#### dpad.up, dpad.down, dpap.right, dpad.left
These buttons are pressure sensitive and emits the followin events:  

```javascript
controller.dpad.direction.emit('press', pressure)
controller.dpad.direction.emit('release')
controller.dpad.direction.emit('pressurechange', newpressure)
```

#### lthumb, rthumb
These are thumbs(sticks) and emits the folowing events  

```javascript
controller.thumb.emit('move', event)
controller.thumb.emit('release')      //This is emited when the stick returns from and off to a centered position
controller.thumb.emit('move:x', x)
controller.thumb.emit('move:y', y)
```

#### start, select
These are buttons and emits the followin events:  

```javascript
controller.button.emit('press', pressure)
controller.button.emit('release')
```







