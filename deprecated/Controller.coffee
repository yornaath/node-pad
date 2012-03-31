
events = require "events"
HID = require "../node-modules/node-hid/src/HID"

class Controller extends events.EventEmitter
  
  constructor: ->
    @state = @layout
    @previousState = @state
    @init()
  
  init: ->
    setTimeout =>
      devicePath = @getDevicePath()
      if devicePath
        @hid = new HID.HID devicePath
        @emit 'connected'
        @on 'error', (msg) =>
          @emit 'disconnected'
          @stopReadingHID()
          @init()
        @startReadingHID()
      else
        @init()
    , 200

  setState: (state) ->
    @previousState = @state
    @state = state
    stateChanges = @getStateChanges()
    if stateChanges
      for button, value of stateChanges
        @emit button, value
  
  stateHasChanged: ->
    if Controller.compare @state, @previousState
      return false
    else
      return true
  
  getDevicePath: ->
    devices = HID.devices()
    for device in devices
      if device.product and device.product.toLowerCase() is @productName.toLowerCase()
        return device.path

  startReadingHID: (HIDState) ->
    firstRead = 1
    reader = (error, data) =>
      if error
        @emit 'error', error
      else
        @setState @processHIDData data
        if firstRead > 0
          @emit 'on'
          firstRead = 0
      if @isReading
        setTimeout =>
          @hid.read reader
        , 5
    @isReading = 1
    @hid.read reader
  
  stopReadingHID: ->
    @isReading = 0
  
  processHIDData: (HIDData) ->
    return HIDData
  
  press: (pattern, callback) ->
    pattern = pattern.split('.')
    source = JSON.stringify(pattern).replace(/,/g, '][') 
  
  getStateChanges: ->
    haschanges = false
    changes = {}
    recurse = (o, oo, keystring)->
      for key, val of o
        if typeof val is 'object'
          recurse val, oo[key], "#{keystring}.#{key}"
        else
          if val isnt oo[key]
            haschanges = true
            changes[("#{keystring}.#{key}").replace /\./, ''] = val
    recurse @state, @previousState, ""
    if haschanges
      return changes
    return false

  @compare: (obj, cand) ->
    (JSON.stringify obj) is (JSON.stringify cand)
      


module.exports = Controller