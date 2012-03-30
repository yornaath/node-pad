



var HID = require('./node-hid/src/HID')

var devices = HID.devices()

var ps3ConstrollerInfo,
    ps3ControllerHid

function getControlerHID () {
  for (var i = devices.length - 1; i >= 0; i--) {
    if(devices[i].product = 'PLAYSTATION(R)3 Controller') {
      ps3ConstrollerInfo = devices[i]
    }
  }

  if(ps3ConstrollerInfo) {
    return new HID.HID(ps3ConstrollerInfo.path)
  }
}

function readControllerState(error, data){
  if(!error && data) {
    var state = {
      cross: data[24],  
      square: data[25], 
      triangle: data[22],
      circle: data[23],
      lthumb: {
        x: data[6],
        y: data[7],
        down: data[2] === 2 ? 1 : 0
      },
      rthumb: {
        x: data[8],
        y: data[9],
        down: data[2] === 4 ? 1 : 0
      },
      dpad: {
        up: data[14],
        right: data[15],
        down: data[16],
        left: data[17]
      },
      r: {
        1: data[21],
        2: data[19]
      },
      l: {
        1: data[20],
        2: data[18]
      },
      start: data[2] === 8 ? 1 : 0,
      select: data[2] === 1 ? 1 : 0
    }
    console.log(state)
  }
  else {
    console.log(arguments);
  }
  setTimeout(function() {
    ps3ControllerHid.read(readControllerState)
  }, 500)
}

function main() {
  ps3ControllerHid = getControlerHID()
  if(ps3ControllerHid) {
    ps3ControllerHid.read(readControllerState)
  }
}



main()

















