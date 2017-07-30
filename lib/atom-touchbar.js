'use babel'

import AtomTouchbarView from './atom-touchbar-view'
import { CompositeDisposable } from 'atom'

export default {
   activate(state) {
      this.atomTouchbarView = new AtomTouchbarView()

      // Register command that toggles this view
      this.subscriptions = new CompositeDisposable()
      this.subscriptions.add(atom.commands.add('atom-workspace', {
         'atom-touchbar:toggle': () => this.toggle()
      }))
   },

   deactivate() {
      this.modalPanel.destroy()
      this.subscriptions.dispose()
      this.atomTouchbarView.destroy()
   },
}
