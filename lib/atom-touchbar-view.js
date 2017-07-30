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
      new TouchBarButton({
         icon: path.join(__dirname, 'icons/left.png'),
         click: function(){
            atom.workspace.getActivePane().activatePreviousItem()
         }
      }),
      new TouchBarButton({
         icon: path.join(__dirname, 'icons/right.png'),
         click: function(){
            atom.workspace.getActivePane().activateNextItem()
         }
      }),
      new TouchBarButton({
         icon: path.join(__dirname, 'icons/undo.png'),
         click: function(){
            atom.workspace.getActivePane().activateNextItem()
         }
      }),
      new TouchBarButton({
         icon: path.join(__dirname, 'icons/save.png'),
         click: function(){
            atom.workspace.getActivePane().activateNextItem()
         }
      }),
      new TouchBarSpacer({
         size: 'flexible'
      }),
      new TouchBarPopover(
         {
            items: tools.colorPickerTool(),
            icon: path.join(__dirname, 'icons/color.png'),
            iconPosition: 'right'
      }),
      new TouchBarColorPicker({
         label: 'Codes',
         backgroundColor: '#F22',
         textColor: '#000',
         click: function() {
            console.log('cats')
         }
      })
    ]
    BrowserWindow.getFocusedWindow().setTouchBar(touchBar)
  }
}
