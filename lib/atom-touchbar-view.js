'use babel';

import AtomTouchBarLoad from './atom-touchbar-load'
import AtomTouchBarActions from './atom-touchbar-actions'
import AtomTouchBarCanvas from './atom-touchbar-canvas'
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

   constructor(touchBarName) {
      this.touchBarName = touchBarName
      this.bars = new AtomTouchBarLoad(this).bars
      this.actions = new AtomTouchBarActions(this).actions

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
      this.touchBarData = this.bars[this.currentTouchBar]
      this.touchBar = this.parseTouchBar(this.touchBarData)

      // Actually load the touchbar
      BrowserWindow.getFocusedWindow().setTouchBar(this.touchBar)
   }

   parseTouchBar(touchBarData){
      this.parsedTouchbar = {}
      // Generate the touchbar object
      this.parsedTouchbar.items = this.parseItems(touchBarData.items)

      if(touchBarData.escapeItem)
         this.parsedTouchbar.escapeItem = this.parseItem(touchBarData.escapeItem)

      return new TouchBar(this.parsedTouchbar)
   }

   parseItems(itemsData){
      var items = []
      for(var item of itemsData){
         items.push(this.parseItem(item, itemsData))
      }

      return items
   }

   parseItem(itemData, itemsData){
      if(itemData.type == 'colorPicker'){
         return new TouchBarColorPicker({
            selectedColor: itemData.color || '#465',
            change: !itemData.action ? console.log('No Color Action') : (color) => {
               this.actions[itemData.action](itemData, itemsData, color)
            }
         })
      }

      if(itemData.type == 'spacer'){
         return new TouchBarSpacer({
            size: itemData.size || 'flexible'
         })
      }

      if(itemData.type == 'label'){
         return new TouchBarLabel({
            label: itemData.label || '',
            textColor: itemData.color || '#FFF'
         })
      }

      if(itemData.type == 'button'){
         return new TouchBarButton({
            label: itemData.label,
            backgroundColor: itemData.background || '#000',
            icon: path.join(__dirname, `../icons/${itemData.icon}.png`),
            iconPosition: itemData.iconPosition || 'overlay',
            click: !itemData.action ? console.log('No Action') : () => {
               this.actions[itemData.action](itemData, itemsData)
            }
         })
      }

      return {}
   }
}
