'use babel';

export default class AtomTouchbarActions {

   constructor(view) {
      this.view = view
   }

   goHome() {
      this.view.changeTouchBar('home')
   }

   goColor() {
      this.view.changeTouchBar('color')
   }

   goClip() {
      this.view.changeTouchBar('clipboard')
   }

   goIcons(){
      this.view.changeTouchBar('icons')
   }

   delete(item){
      item.state = item.state ? false : true
      item.background = item.state ? '#F22' : '#333'
      this.view.render()
   }

   copy(item, touchbar){
      this.view.bars.clipboard.items.push({
         type: 'button',
         label: item.label,
         icon: item.icon,
         action: 'paste',
         background: '#000',
         unique: performance.now(),
         copy: atom.workspace.getActiveTextEditor().getSelectedText()
      })

      // Go back to clipboard
      this.goClip()
   }

   paste(item, touchbar){
      if(touchbar[1].state){
         for(var i = 0; i < touchbar.length; i++){
            if(touchbar[i].unique == item.unique) touchbar.splice(i, 1)
         }

         this.delete(touchbar[1])
         this.view.render()
         return
      }
      atom.workspace.getActiveTextEditor().insertText(item.copy)
   }
}
