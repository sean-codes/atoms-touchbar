'use babel';

export default class AtomTouchbarActions {

   constructor(view) {
      this.view = view
      this.actions = this.importTouchBarActions()
   }

   importTouchBarActions() {
      var path = `./touchbars/${this.view.touchBarName}/actions.js`
      var AtomTouchBarLoadedActions = require(path)
      return new AtomTouchBarLoadedActions(this.view)
   }
}
