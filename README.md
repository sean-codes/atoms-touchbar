# Atoms Touchbar Package

The touchbar package for Atom.io. This package is to extend some keyboard functionallity rather than duplicate common keyboard shortcuts in atom. Please if you run into any issues or features post here: [Features/Issues](https://github.com/sean-codes/atoms-touchbar/issues)

## Multiclipboard
![MulticlipboardExample](https://github.com/sean-codes/atom-touchbar/raw/master/example/example_clipboard_test.gif)

Select your text, click the copy button. Choose an icon. This will save the copy to your clip board. By pressing the icon it will paste that text!

## Color Picker
![ColorPickerExample](https://github.com/sean-codes/atom-touchbar/raw/master/example/example_paint_test.gif)

Choose a color from the colorpicker tool. Click to paste either HEX, RGB, or RGBA. The color will be saved as a recent color if you need it again!

## Particles
![ParticlesExample](https://github.com/sean-codes/atom-touchbar/raw/master/example/example_particles_test.gif)

Press the `:]` key to open up a particle effect that really shows how fancy your touchbar is!

## Extras
   * Focus - Hides Left and Right docks
   * GitHub - Opens GitHub dock

## Structure

     atoms-touchbar/lib/touchbars/
     └── default/
         ├── actions.js (where the actions live)
         └── bars
             ├── clipboard.json
             ├── color.json
             ├── home.json
             ├── icons.json
             └── madness.json

If you would like to build a new touchbar or change the default. Open your `.atom/packages/atoms-touchbar`
Inside `lib/touchbars` you can see the `default` folder. This is where the touchbars and actions for those bars are stored! The bars/actions inside uses all of the current features and it will be easy to make a copy. Change the actions and touchbars to fit! [Open a pull request](https://github.com/sean-codes/atoms-touchbar) to add your folder to the main package!
