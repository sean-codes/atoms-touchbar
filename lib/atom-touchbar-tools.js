'use babel';

export default class AtomTouchbarTools {

   home() {
      return {
         items: [
            {
               type: 'button',
               icon: 'left',
               click: 'toolbarLeft'
            },
            {
               type: 'button',
               icon: 'right',
               click: 'toolbarRight'
            }
         ]
      }
   }

   paint(){
      return {
         escapeItem: {
            type: 'button',
            icon: 'close',
            background: '#000',
            action: 'goHome'
         },
         items: [
            {
               type: 'button',
               icon: 'left',
               click: 'toolbarLeft'
            },
            {
               type: 'button',
               icon: 'right',
               click: 'toolbarRight'
            }
         ]
      }
   }
}
