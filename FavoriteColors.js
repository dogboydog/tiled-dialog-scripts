/* 	Advanced scripting prompt test script
*/
// https://cdn.discordapp.com/attachments/984810493124423730/984961513351704636/unknown.png 
var FavoriteColors = {};


FavoriteColors.testPromptAction = tiled.registerAction("FavoriteColors", function (action) {

    var dialog = new Dialog("Favorite Colors", 600, 450);
    var state = {

    };

    function watchForColorChange(widget, stateKey) {
        for(const myKey of Object.keys(widget.mainWidget)){
            tiled.log(` input widget key ${myKey}`);
        }
        if (!widget.mainWidget.colorChanged){
            tiled.log("colorChanged is undefined")
        }
        widget.mainWidget.colorChanged.connect((newValue) => {
            tiled.log(`The new ${stateKey} value is ${newValue}`);
            state[stateKey] = newValue;
        });
    }
   // var mainLabel = dialog.addLabel("Pick your four favorite colors", true);
    // var spacerLabel = dialog.addLabel('Colors', false);
    var colorButton1 = dialog.addColorButton("#1");
    watchForColorChange(colorButton1, "color1");   
    var colorButton2 = dialog.addColorButton("#2");
    watchForColorChange(colorButton2, "color2");
    var colorButton3 = dialog.addColorButton("#3");
    watchForColorChange(colorButton3, "color3");
    var colorButton4 = dialog.addColorButton("#4");
    watchForColorChange(colorButton4, "color4");
    dialog.addSeparator();
    dialog.addSlider("Hello my slider: ");
    var okButton = dialog.addButton("OK");
    okButton.mainWidget.clicked.connect(() => {
        tiled.log(`OK button clicked.`);    
    });
    dialog.show();
});


FavoriteColors.testPromptAction.text = "Favorite Colors";

tiled.extendMenu("Edit", [
    { action: "FavoriteColors", before: "SelectAll" },
    { separator: true }
]);
