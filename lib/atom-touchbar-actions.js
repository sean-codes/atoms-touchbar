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

export default class AtomTouchbarActions {

   constructor() {
      console.log('TouchBar Toolbelt')
   }

   goBack() {
      console.log('Going Back')
   }
}
