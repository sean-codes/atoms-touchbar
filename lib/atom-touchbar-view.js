'use babel';

const { BrowserWindow, TouchBar } = require('remote')

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
    // Create root element
    var touchBar = [
      new TouchBarButton({
          label: 'Sean',
          backgroundColor: '#465',
          textColor: '#000'
      }),
      new TouchBarSpacer({
          size: 'small'
      }),
      new TouchBarButton({
          label: 'Codes',
          backgroundColor: '#465',
          textColor: '#000'
      })
    ]

    BrowserWindow.getFocusedWindow().setTouchBar(touchBar)
  }

  getElement() {
    return this.element;
  }
}
