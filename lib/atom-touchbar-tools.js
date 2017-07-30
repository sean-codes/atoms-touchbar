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
         new TouchBarButton({
            label: 'HEX',
            textColor: '#000'
         }),
         new TouchBarButton({
            label: 'RGB',
            textColor: '#000'
         }),
         new TouchBarButton({
            label: 'RGBA',
            textColor: '#000'
         })
      ]

      return toolBar
   }
}
