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

   copyDelete(){
      console.log('Delting a copy')
      var touchBar = this.view.load.bars.clipboard
      var delButton = touchBar.items[touchBar.extra.deleteButtonPosition]
      var newState = touchBar.extra.deleteToggle ? false : true
      touchBar.extra.deleteToggle = newState

      delButton.background =  newState ? '#F22' : '#333'
      this.goClip()
   }

   addCopy(item){
      item.state = item.state ? false : true
      item.background = item.state ? '#F22' : '#333'
      this.view.render()
      console.log(item)
   }
}
