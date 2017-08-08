'use babel';
import AtomTouchBarCanvas from '../../atom-touchbar-canvas'

export default class AtomTouchBarLoadedActions {
   constructor(view){
      this.view = view
   }
   // Go to touchbar actions
   goHome() {
      this.view.changeTouchBar('home')
   }

   goColor() {
      this.view.changeTouchBar('color')
   }

   goClip(item, touchbar) {
      this.view.changeTouchBar('clipboard')
   }

   goIcons(){
      this.view.changeTouchBar('icons')
   }

   // Homebar actions
   escapeKey(){
      var key;
      key = atom.keymaps.constructor.buildKeydownEvent('escape', {target: document.activeElement});
      return atom.keymaps.handleKeyboardEvent(key);
   }

   openGitTab(){
      var rightDock = atom.workspace.getRightDock()
      rightDock.state.visible
      ? rightDock.hide()
      : rightDock.show()
   }

   openDevTools(){
      require('remote').getCurrentWindow().toggleDevTools();
   }

   focusMode(){
      atom.workspace.getRightDock().hide()
      var treeView = atom.workspace.getLeftDock()
      treeView.state.visible
      ? treeView.hide()
      : treeView.show()
   }

   // ClipBoard Actions
   clipboardDeleteToggle(item, touchbar){
      item.state = item.state ? false : true
      item.background = item.state ? '#F22' : '#000'
      this.view.render()
   }

   clipboardAddItem(item, touchbar){
      this.view.bars.clipboard.items.splice(this.view.bars.clipboard.items.length-1, 0, {
         type: 'button',
         label: item.label,
         icon: item.icon,
         action: 'clipboardPasteItem',
         background: '#000',
         unique: performance.now(),
         copy: atom.workspace.getActiveTextEditor().getSelectedText()
      })
      this.goClip()
   }

   clipboardPasteItem(item, touchbar){
      if(touchbar[1].state){
         for(var i = 0; i < touchbar.length; i++){
            if(touchbar[i].unique == item.unique) touchbar.splice(i, 1)
         }

         this.clipboardDeleteToggle(touchbar[1])
         this.view.render()
         return
      }
      atom.workspace.getActiveTextEditor().insertText(item.copy)
   }

   // Colorpicker actions
   colorChange(item, touchbar, color){
      item.color = color
      this.view.parsedTouchbar.items[0].backgroundColor = color
      this.view.parsedTouchbar.items[1].backgroundColor = color
      this.view.parsedTouchbar.items[2].backgroundColor = color
      this.view.bars.color.items[0].background = color
      this.view.bars.color.items[1].background = color
      this.view.bars.color.items[2].background = color
   }
   addColorToBar(hex, label){
      this.view.bars.color.items.splice(this.view.bars.color.items.length-1, 0, {
         'type':'button',
         'background': hex,
         'action': 'colorPasteLabel',
         'label': label
      })

      // Splice the bar in!
      if(this.view.bars.color.items.length > 9)
         this.view.bars.color.items.splice(4, 1)

      this.view.render()
   }

   colorPasteHex(item, touchbar){
      var color = touchbar[touchbar.length-1].color
      atom.workspace.getActiveTextEditor().insertText(color)

      // Save recently used colors
      this.addColorToBar(color, color)
   }

   colorPasteHexLabel(item, touchbar){
      var color = item.label
      atom.workspace.getActiveTextEditor().insertText(color)
   }

   colorPasteRGB(item, touchbar, a){
      var color = touchbar[touchbar.length-1].color
      rgb = {
         r: parseInt('0x' + color.slice(1,3)),
         g: parseInt('0x' + color.slice(3,5)),
         b: parseInt('0x' + color.slice(5,7))
      }

      var rgbString = `rgb${a?'a':''}(${rgb.r}, ${rgb.g}, ${rgb.b}${a ? ', 1' : ''})`
      // Save recently used colors
      this.addColorToBar(color, rgbString)
      atom.workspace.getActiveTextEditor().insertText(rgbString)
   }

   colorPasteRGBA(item, touchbar){
      this.colorPasteRGB(item, touchbar, true)
   }

   // I would not even go down there!
   goMadness(){
      this.view.changeTouchBar('madness')
      var btn = this.view.parsedTouchbar.items[0]
      var canvas = new AtomTouchBarCanvas({
         width: 1450,
         height: 64,
         system: {
            particles: [],
            particle: function(){
               this.dead = false
               this.x = Math.floor(Math.random()*1450)
               this.y = Math.floor(Math.random()*64)
               this.size = 8
               this.xDirection = Math.random() > 0.5 ? 2 : -2
               this.yDirection = Math.random() > 0.5 ? 2 : -2

               this.move = function(){
                  this.x += this.xDirection
                  this.y += this.yDirection

                  if(this.x % 20 === 0 && this.y % 20 === 0)
                     this.changeDirection()

                  if(this.x < 0 || this.x > 1450 || this.y < 0 || this.y > 64)
                     this.dead = true
               }

               this.changeDirection = function(){
                  this.xDirection = Math.random() > 0.5 ? 2 : -2
                  this.yDirection = Math.random() > 0.5 ? 2 : -2
               }
            },
            generate: function(){
               if(Math.random() > 0.5)
                  this.createParticle()
            },
            createParticle: function(){
               this.particles.push(new this.particle())
            }
         },
         step: function(){
            this.setFillStyle('#FFF')
            var system = this.options.system
            var particles = system.particles

            system.generate()

            var liveParticles = []
            for(var particle of particles){
               if(particle.dead) continue
               liveParticles.push(particle)
               particle.move()

               var color = Math.floor(255 * (particle.y/this.canvas.height))
               this.setFillStyle(`rgba(${color}, ${Math.floor(color*0.25)}, 100, 0.75)`)
               this.fillCircle({
                  x: particle.x,
                  y: particle.y,
                  size: particle.size
               })
            }
            particles = liveParticles

            this.setFillStyle('rgba(0, 0, 0, 0.05)')
            this.fillRect({ x: 0, y: 0, width: this.canvas.width, height: this.canvas.width })
            btn.icon = this.toImage()
         }
      })
   }

}
