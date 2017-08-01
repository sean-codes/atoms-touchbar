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
}
