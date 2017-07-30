'use babel';

const {
   BrowserWindow,
   TouchBar
} = require('remote')

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

export default class AtomTouchbarTools {

   constructor() {
      console.log('TouchBar Toolbelt')
   }

   colorPickerTool() {
      // Opens the color picker toolset for inserting HEX, RGB, and RGBA values
      var toolBar = [
         new TouchBarColorPicker({
            label: 'Codes',
            backgroundColor: '#F22',
            textColor: '#000',
            click: function() {
               console.log('cats')
            }
         }),
         new TouchBarButton({
            label: 'HEX',
            backgroundColor: '#465',
            textColor: '#000'
         }),
         new TouchBarButton({
            label: 'RGB',
            backgroundColor: '#465',
            textColor: '#000'
         }),
         new TouchBarButton({
            label: 'RGBA',
            backgroundColor: '#465',
            textColor: '#000'
         })
      ]

      return toolBar
   }
}
