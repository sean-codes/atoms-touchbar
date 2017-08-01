'use babel';

import AtomTouchBarTools from './atom-touchbar-tools'
import AtomTouchBarActions from './atom-touchbar-actions'

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
      this.tools = new AtomTouchBarTools()
      this.actions = new AtomTouchBarActions(this)

      //Switch to initail bar
      this.changeTouchBar('paint')
   }

   changeTouchBar(name){
      var touchBarData = this.tools[name]()
      var touchBar = this.parseTouchBar(touchBarData)

      // Actually load the touchbar
      BrowserWindow.getFocusedWindow().setTouchBar(touchBar)
   }

   parseTouchBar(touchBarData){
      // Generate the touchbar object
      touchBarData.items = this.parseItems(touchBarData.items)

      if(touchBarData.escapeItem)
         touchBarData.escapeItem = this.parseItem(touchBarData.escapeItem)

      return new TouchBar(touchBarData)
   }

   parseItems(itemsData){
      var items = []
      for(var item of itemsData){
         items.push(this.parseItem(item))
      }

      return items
   }

   parseItem(itemData){
      if(itemData.type == 'button'){
         return new TouchBarButton({
            label: itemData.label,
            backgroundColor: itemData.background,
            icon: path.join(__dirname, `../icons/${itemData.icon}.png`),
            click: !itemData.action ? console.log('No Action') : () => {
               this.actions[itemData.action]()
            }
         })
      }

      if(itemData.type == 'colorPicker'){
         return new TouchBarColorPicker()
      }

      return {}
   }
}
