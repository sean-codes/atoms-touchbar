'use babel';

export default class AtomTouchbarTools {

   home() {
      return {
         items: [
            {
               type: 'button',
               icon: 'clip',
               action: 'goClip'
            },
            {
               type: 'button',
               icon: 'color',
               action: 'goColor'
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
               type: 'colorPicker'
            },
            {
               type: 'button',
               label: 'HEX',
               click: 'toolbarLeft'
            },
            {
               type: 'button',
               label: 'RGB',
               click: 'toolbarRight'
            },
            {
               type: 'button',
               label: 'RGBA',
               click: 'toolbarRight'
            }
         ]
      }
   }

   clip(){
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
               label: 'Copy',
               click: 'toolbarLeft'
            },
            {
               type: 'button',
               label: 'Paste',
               click: 'toolbarRight'
            }
         ]
      }
   }
}
