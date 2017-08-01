'use babel';

const path = require('path')
const fs = require('fs')

export default class AtomTouchbarLoad {
   constructor(){
      this.bars = {
         home: this.loadTouchBar('home'),
         clipboard: this.loadTouchBar('clipboard'),
         color: this.loadTouchBar('color')
      }
   }

   loadTouchBar(name){
      var filePath = path.join(__dirname, `touchbars/${name}.json`)
      return JSON.parse(fs.readFileSync(filePath, "utf8"))
   }
}
