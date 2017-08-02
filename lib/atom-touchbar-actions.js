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

   copyDelete(item, touchbar){
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
         copy: atom.workspace.getActiveTextEditor().getSelectedText()
      })

      // Go back to clipboard
      this.goClip()
   }

   paste(item){
      atom.workspace.getActiveTextEditor().insertText(item.copy)
   }
}
