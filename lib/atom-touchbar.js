'use babel'

import AtomTouchbarView from './atom-touchbar-view'
import { CompositeDisposable } from 'atom'

export default{
   activate() {
      this.atomTouchbarView = new AtomTouchbarView()
   },

   deactivate() {
      this.atomTouchbarView.destroy()
   }
}
