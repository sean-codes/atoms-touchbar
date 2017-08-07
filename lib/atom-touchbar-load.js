'use babel';

const path = require('path')
const fs = require('fs')

export default class AtomTouchbarLoad {
   constructor(view){
      this.folder = path.join(__dirname, `touchbars/${view.touchBarName}/bars`)
      this.bars = {}

      // Dynamically Load the bars
      fs.readdirSync(this.folder).forEach(file => {
         var name = file.split('.')[0]
         this.bars[name] = this.loadTouchBar(name)
      })
   }

   loadTouchBar(name){
      var filePath = this.folder + `/${name}.json`
      return JSON.parse(fs.readFileSync(filePath, "utf8"))
   }
}
