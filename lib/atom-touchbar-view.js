'use babel';

import AtomTouchBarTools from './atom-touchbar-tools'

// Include for Electrons TouchBar API
const BrowserWindow = require('remote').BrowserWindow
const TouchBar = require('remote').TouchBar
const path = require('path');
const {
   TouchBarButton,
   TouchBarColorPicker,
   TouchBarGroup,
   TouchBarLabel,
   TouchBarPopover,
   TouchBarScrubber,
   TouchBarSegmentedControl,
   TouchBarSlider,
   TouchBarSpacer
} = TouchBar


export default class AtomTouchbarView {

  constructor() {
     var tools = new AtomTouchBarTools()

    // Create root element
    var touchBar = [
      new TouchBarPopover({
          items: tools.colorPickerTool(),
          icon: path.join(__dirname, 'icons/color.png')
      })
    ]
    BrowserWindow.getFocusedWindow().setTouchBar(touchBar)
  }
}
