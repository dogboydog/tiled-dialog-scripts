/* 	Advanced scripting prompt test script
*/
// https://cdn.discordapp.com/attachments/984810493124423730/984961513351704636/unknown.png 
var FavoriteColors = {};


FavoriteColors.testPromptAction = tiled.registerAction("FavoriteColors", function (action) {

    var dialog = new Dialog("Favorite Colors", 600, 450);
    dialog.newRowMode = Dialog.SingleWidgetRows;
    var state = {
    };

    function watchForColorChange(widget, stateKey) {
        if (!widget.colorChanged){
            tiled.log("colorChanged is undefined")
        }
        widget.colorChanged.connect((newValue) => {
            tiled.log(`The new ${stateKey} value is ${newValue}`);
            state[stateKey] = newValue;
        });
    }

   // var mainLabel = dialog.addHeading("Pick your four favorite colors", true);
    // var spacerLabel = dialog.addHeading('Colors', false);
    var colorButton1 = dialog.addColorButton("#1");
    colorButton1.color = "#000000"
    watchForColorChange(colorButton1, "color1");   
    var colorButton2 = dialog.addColorButton("#2");
    colorButton2.color = "#aef1b2"
    watchForColorChange(colorButton2, "color2");
    var colorButton3 = dialog.addColorButton("#3");
    colorButton3.color = "#bc0e9b"
    watchForColorChange(colorButton3, "color3");
    var colorButton4 = dialog.addColorButton("#4");
    colorButton4.color = "#ff1212"
    watchForColorChange(colorButton4, "color4");
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
