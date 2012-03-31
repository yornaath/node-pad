
Controller = require "./Controller"

class Dualshock extends Controller
  
  productName: 'PLAYSTATION(R)3 Controller'
  
  layout:
    cross: 0
    square: 0
    triangle: 0
    circle: 0
    lthumb:
      x: 0
      y: 0
      down: 0
    rthumb:
      x: 0
      y: 0
      down: 0
    dpad:
      up: 0
      right: 0
      down: 0
      left: 0
    r1: 0
    r2: 0
    l1: 0
    l2: 0
    start: 0
    select: 0
  
  processHIDData: (data) ->
    cross: data[24]  
    square: data[25] 
    triangle: data[22]
    circle: data[23]
    lthumb: 
      x: data[6]
      y: data[7]
      down: if data[2] is 2 then 1 else 0
    rthumb: 
      x: data[8]
      y: data[9]
      down: if data[2] is 4 then 1 else 0
    dpad: 
      up: data[14]
      right: data[15]
      down: data[16]
      left: data[17]
    r1: data[21]
    r2: data[19]
    l1: data[20]
    l2: data[18]
    start: if data[2] is 8 then 1 else 0
    select: if data[2] is 1 then 1 else 0





dualshock = new Dualshock

dualshock.on 'cross', (value) ->
  console.log('corsschange: ', value)

dualshock.on 'lthumb.x', (val) ->
  console.log 'lthumb.x - ', val

dualshock.on 'lthumb.y', (val) ->
  console.log 'lthumb.y - ', val



















