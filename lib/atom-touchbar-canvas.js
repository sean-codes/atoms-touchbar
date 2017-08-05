'use babel';

const nativeImage = require('remote').nativeImage

export default class AtomTouchbarDrawing {

   constructor(options) {
      this.options = options

      // Create the canvas
      this.canvas = document.createElement('canvas')
      this.canvas.width = options.width//MAX: 1150
      this.canvas.height = options.height//MAX: 64
      this.ctx = this.canvas.getContext('2d')

      if(options.step){
         setInterval( () => {
            options.step.call(this)
         }, 1000/30)
      }
   }

   toImage(){
      return nativeImage.createFromDataURL(this.canvas.toDataURL())
   }

   setFillStyle(color){
      this.ctx.fillStyle = color
   }

   fillRect(info){
      this.ctx.fillRect(info.x, info.y, info.width, info.height)
   }

   strokeRect(info){
      this.ctx.strokeRect(info.x, info.y, info.width, info.height)
   }

   strokeCircle(info){
      this.arcCircle(info)
      this.ctx.stroke();
   }

   fillCircle(info){
      this.arcCircle(info)
      this.ctx.fill();
   }

   arcCircle(info){
      this.ctx.beginPath();
      this.ctx.arc(info.x, info.y, info.size, 0, 2*Math.PI);
   }
}
