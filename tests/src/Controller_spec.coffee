
Controller = require "../lib/Controller.js"

layout = 
  button1: 0
  button2: 0
  dpad:
    up: 0
    down: 0
    left: 0
    right: 0

describe "Controller", ->
  
  describe "constructor", ->
    
    it "Should set layout on controller from the given layout argument", ->
      class EController extends Controller
        layout: layout
      controller = new EController
      expect(controller.layout is layout).toBeTruthy()
  
  describe "stateHasChanged", ->
    it "Should return true if state is different from previousState, false if else", ->
      class EController extends Controller
        layout: layout
      controller = new EController
      controller.state = 
        button1: 0
        button2: 0
      controller.previousState = 
        button1: 0
        button2: 1
      expect(controller.stateHasChanged()).toEqual(true)

  describe "setState", ->
    
    it "Should set controller.state to the new state", ->
      class EController extends Controller
        layout: layout
      controller = new EController
      expect(controller.state is layout).toBeTruthy()
      state = 
        button1: 1
        button2: 0
        dpad:
          up: 0
          down: 2
          left: 0
          right: 0
      controller.setState state
      expect(controller.state is state).toBeTruthy()
    
    it "Should emit a 'statechange' event if new state is different than the previous", ->
      self = @
      class EController extends Controller
        layout: 
          button1: 0
          button2: 0
      controller = new EController
      controller.on 'statechange', (state) ->
        self.newState = state
        self.statechangeEventFired = true
      controller.setState
        button1: 0
        button2: 1
      waitsFor ->
        return self.statechangeEventFired is true
      , 'statechange event never fired', 200
      runs ->
        expect(@statechangeEventFired).toEqual true
        expect(@newState['button1']).toEqual 0
        expect(@newState['button2']).toEqual 1

    describe "map", ->
      class EController extends Controller
        layout:
          button1: 0
          button2: 0
          dpad:
            up: 0
            down: 0
            right: 0
            left: 0
      controller = null
      beforeEach ->
        controller = new EController
    
        

    describe "pressed", ->
      class EController extends Controller
        layout:
          button1: 0
          button2: 0
          dpad:
            up: 0
            down: 0
            right: 0
            left: 0
      controller = null
      beforeEach ->
        controller = new EController
      
      it "Should map a pressed event to the given button, and fire the callback upon pressed", ->
        self = @
        controller.press 'button1', ->
          self.button1Pressed = true
        controller.setState
          button1: 1
          button2: 0
          dpad:
            up: 0
            down: 0
            right: 0
            left: 0
        waitsFor ->
          return if this.button1Pressed then true else false
        , 'button1 never pressed', 100
        runs ->
          expect(@button1Pressed).toEqual(true)







        
        
        
    