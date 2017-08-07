'use babel'

import AtomTouchbarView from './atom-touchbar-view'
import { CompositeDisposable } from 'atom'

export default{
   activate() {
      this.touchBarName = 'default'
      this.atomTouchbarView = new AtomTouchbarView(this.touchBarName)
   },

   deactivate() {
      this.atomTouchbarView.destroy()
   }
}
