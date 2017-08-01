'use babel';

export default class AtomTouchbarActions {

   constructor(view) {
      this.view = view
      console.log('TouchBar Toolbelt')
   }

   goHome() {
      this.view.changeTouchBar('home')
   }

   goColor() {
      this.view.changeTouchBar('paint')
   }

   goClip() {
      this.view.changeTouchBar('clip')
   }
}
