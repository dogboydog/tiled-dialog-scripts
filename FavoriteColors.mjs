/* 	Advanced scripting prompt test script
*/
var FavoriteColors = {};

import {DialogUtils} from 'DialogUtils.mjs';
FavoriteColors.testPromptAction = tiled.registerAction("FavoriteColors", function (action) {

    var dialog = new Dialog("Favorite Colors");
    dialog.newRowMode = Dialog.SingleWidgetRows;
    var state = {
    };

   // var mainLabel = dialog.addHeading("Pick your four favorite colors", true);
    // var spacerLabel = dialog.addHeading('Colors', false);
    var colorButton1 = dialog.addColorButton("#1");
    colorButton1.color = "#000000"
    DialogUtils.watchForStateChange(colorButton1, "color1", state);   
    var colorButton2 = dialog.addColorButton("#2");
    colorButton2.color = "#aef1b2"
    DialogUtils.watchForStateChange(colorButton2, "color2", state);
    var colorButton3 = dialog.addColorButton("#3");
    colorButton3.color = "#bc0e9b"
    DialogUtils.watchForStateChange(colorButton3, "color3", state);
    var colorButton4 = dialog.addColorButton("#4");
    colorButton4.color = "#ff1212"
    DialogUtils.watchForStateChange(colorButton4, "color4", state);
    dialog.addSeparator();
    var okButton = dialog.addButton("OK");
    okButton.clicked.connect(() => {
        tiled.log(`OK button clicked.`);    
        dialog.accept();
    });
    dialog.show();
});


FavoriteColors.testPromptAction.text = "Favorite Colors";

tiled.extendMenu("Edit", [
    { action: "FavoriteColors", before: "SelectAll" },
    { separator: true }
]);
