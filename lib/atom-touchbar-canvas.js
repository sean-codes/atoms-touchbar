'use babel';

const nativeImage = require('remote').nativeImage

export default class AtomTouchbarDrawing {

   constructor(view) {
      this.view = view
      this.size = {
         width: 1150,
         height: 64
      }
   }

   toImage(){
      return nativeImage.createFromDataURL(this.canvas.toDataURL())
   }
   makeOrb(){
      this.canvas = document.createElement('canvas')
      this.canvas.width = 1200
      this.canvas.height = 50
      this.ctx = this.canvas.getContext('2d')

      this.ctx.fillStyle = '#FFF';
      var info = {
         x: this.canvas.width/2 + Math.random()*200,
         y: this.canvas.height/2,
         size: this.canvas.height/4
      }

      this.ctx.globalAlpha=0.75
      this.fillCircle(info)
      info.size -= 2
      this.ctx.globalAlpha=1;
      this.fillCircle(info)

      return nativeImage.createFromDataURL(this.canvas.toDataURL())
   }


   fillCircle(info){
      this.ctx.beginPath();
      this.ctx.arc(info.x,info.y,info.size,0,2*Math.PI);
      this.ctx.fill();
   }
}
