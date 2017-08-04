'use babel';

import AtomTouchBarCanvas from './atom-touchbar-drawing'

export default class AtomTouchbarActions {

   constructor(view) {
      this.view = view
   }


   // Go to touchbar actions
   goHome() {
      this.view.changeTouchBar('home')
   }

   goColor() {
      this.view.changeTouchBar('color')
   }

   goClip(item, touchbar) {
      this.view.changeTouchBar('clipboard')
   }

   goIcons(){
      this.view.changeTouchBar('icons')
   }

   // Homebar actions
   escapeKey(){
      var key;
      key = atom.keymaps.constructor.buildKeydownEvent('escape', {target: document.activeElement});
      return atom.keymaps.handleKeyboardEvent(key);
   }

   openGitTab(){
      var rightDock = atom.workspace.getRightDock()
      rightDock.state.visible
      ? rightDock.hide()
      : rightDock.show()
   }

   focusMode(){
      atom.workspace.getRightDock().hide()
      var treeView = atom.workspace.getLeftDock()
      treeView.state.visible
      ? treeView.hide()
      : treeView.show()
   }

   // ClipBoard Actions
   clipboardDeleteToggle(item, touchbar){
      item.state = item.state ? false : true
      item.background = item.state ? '#F22' : '#000'
      this.view.render()
   }

   clipboardAddItem(item, touchbar){
      this.view.bars.clipboard.items.splice(this.view.bars.clipboard.items.length-1, 0, {
         type: 'button',
         label: item.label,
         icon: item.icon,
         action: 'clipboardPasteItem',
         background: '#000',
         unique: performance.now(),
         copy: atom.workspace.getActiveTextEditor().getSelectedText()
      })
      this.goClip()
   }

   clipboardPasteItem(item, touchbar){
      if(touchbar[1].state){
         for(var i = 0; i < touchbar.length; i++){
            if(touchbar[i].unique == item.unique) touchbar.splice(i, 1)
         }

         this.clipboardDeleteToggle(touchbar[1])
         this.view.render()
         return
      }
      atom.workspace.getActiveTextEditor().insertText(item.copy)
   }

   // Colorpicker actions
   colorChange(item, touchbar, color){
      item.color = color
   }

   colorPasteHex(item, touchbar){
      var color = touchbar[touchbar.length-1].color
      atom.workspace.getActiveTextEditor().insertText(color)


   }

   colorPasteRGB(item, touchbar, a){
      var color = touchbar[touchbar.length-1].color
      rgb = {
         r: parseInt('0x' + color.slice(1,3)),
         g: parseInt('0x' + color.slice(3,5)),
         b: parseInt('0x' + color.slice(5,7))
      }

      // Sad alpha string at the end I apologize
      var rgbString = `rgb${a?'a':''}(${rgb.r}, ${rgb.g}, ${rgb.b}${a ? ', 1' : ''})`
      atom.workspace.getActiveTextEditor().insertText(rgbString)
   }

   colorPasteRGBA(item, touchbar){
      this.colorPasteRGB(item, touchbar, true)
   }

   // Madness
   goMadness(){
      this.view.changeTouchBar('madness')
      console.log(this.view.parsedTouchbar.items[0].label = 'wtf')

      var that = this
      // setInterval(function(){
      //    var icon = new AtomTouchBarCanvas()
      //    icon.makeOrb()
      //
      //    that.view.parsedTouchbar.items[0].icon = icon.toImage()
      // }, 1000/60)
   }

}
