'use babel';

import AtomTouchBarLoad from './atom-touchbar-load'
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
      this.load = new AtomTouchBarLoad()
      this.actions = new AtomTouchBarActions(this)

      //Switch to initail bar
      this.currentTouchBar = ''
      this.changeTouchBar('home')
   }
   changeTouchBar(name){
      this.currentTouchBar = name
      this.render()
   }

   render(){
      // Parsing the touchbar
      var touchBarData = this.load.bars[this.currentTouchBar]
      var touchBar = this.parseTouchBar(touchBarData)

      // Actually load the touchbar
      BrowserWindow.getFocusedWindow().setTouchBar(touchBar)
   }

   parseTouchBar(touchBarData){
      var newTouchBar = {}
      // Generate the touchbar object
      newTouchBar.items = this.parseItems(touchBarData.items)

      if(touchBarData.escapeItem)
         newTouchBar.escapeItem = this.parseItem(touchBarData.escapeItem)

      return new TouchBar(newTouchBar)
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
               this.actions[itemData.action](itemData)
            }
         })
      }

      if(itemData.type == 'colorPicker'){
         return new TouchBarColorPicker()
      }

      if(itemData.type == 'spacer'){
         console.log(itemData.size || 'small')
         return new TouchBarSpacer({
            size: itemData.size || 'small'
         })
      }

      if(itemData.type == 'label'){
         return new TouchBarLabel({
            label: itemData.label || '',
            textColor: itemData.color || '#FFF'
         })
      }

      return {}
   }
}
