

/**
 * Make sure to place tiledbear.png in the same directory as this script.
 */
var DynamicImageDialog = {};
const f = __filename;
DynamicImageDialog.watchForStateChange = function (widget, stateKey) {

    if (widget.valueChanged) {
        widget.valueChanged.connect((newValue) => {
            tiled.log(`The new ${stateKey} value is ${newValue}`);
            state[stateKey] = widget.value;
        });
    }
    if (widget.colorChanged) {
        widget.colorChanged.connect((newValue) => {
            tiled.log(`The new ${stateKey} color is ${newValue}`);
            state[stateKey] = newValue;
        });
    }
    if (widget.textChanged) {
        widget.textChanged.connect((newValue) => {
            tiled.log(`The new ${stateKey} text is ${newValue}`);
            state[stateKey] = newValue;
        });
    }
    if (widget.currentTextChanged) {
        widget.currentTextChanged.connect((newValue) => {
            tiled.log(`The new ${stateKey} text is ${newValue}`);
            state[stateKey] = newValue;
        });
    }


    if (widget.stateChanged) {
        widget.stateChanged.connect((newValue) => {
            tiled.log(`The new ${stateKey} value is ${newValue}`);
            state[stateKey] = newValue;
        });
    }


};
DynamicImageDialog.drawUI = function (state) {
    var dialog = state.dialog;
    dialog.clear();
    dialog.windowTitle = "Dynamic Image Dialog";

    dialog.addSeparator("Color Choices ");
    dialog.addHeading(' ');
    dialog.newRowMode = Dialog.ManualRows;

    // avoid issues with re-use of the 'colorIndex' variable
    const createColorButtonHandler = function (colorIndex) {
        return function (newColor) {
            tiled.log(`Color button #${colorIndex} (${state.colorNames[colorIndex]}) value changed to ${newColor}`);
            state.colors[colorIndex] = newColor;
            DynamicImageDialog.drawUI(state);
        };
    }
    for (var colorIndex = 1; colorIndex < state.colors.length; colorIndex++) {

        state.colorButtons[colorIndex] = dialog.addColorButton(`${state.colorNames[colorIndex]}`);
        state.colorButtons[colorIndex].color = state.colors[colorIndex];
        state.colorButtons[colorIndex].colorChanged.connect(createColorButtonHandler(colorIndex));        
        if ((colorIndex) % 2 ==0){
            dialog.addNewRow();
        }
    }
    dialog.newRowMode = Dialog.SameWidgetRows;
    dialog.addNewRow();
    dialog.addHeading(' ');
    state.imageWidget = dialog.addImage('', DynamicImageDialog.createImage(state));
    dialog.show();
};
DynamicImageDialog.createImage = function (state) {
    var mappedImageData = [];
    for (var i = 0; i < state.imgData.length; i++) {
        var colorCode = state.imgData[i];
        mappedImageData.push(state.colors[parseInt(colorCode, 10)]);
    }
    var colorsSummary = '';
    for (var i = 64; i < 80; i++) {
        colorsSummary += mappedImageData[i] + ',';
    }
    var image = new Image(state.imgWidth, state.imgHeight, Image.Format_RGB32);
    for (var x = 0; x < state.imgWidth; x++) {
        for (var y = 0; y < state.imgHeight; y++) {
            image.setPixelColor(x, y, mappedImageData[x + y * state.imgWidth])
        }
    }
    return image.scaled(state.imgWidth *8, state.imgHeight *8);
}
DynamicImageDialog.testPromptAction = tiled.registerAction("DynamicImageDialog", function (action) {
    const defaultColor1 = "#9cfcf0";
    const defaultColor2 = "#92809d";
    const defaultColor3 = "#5d392a";
    const defaultColor4 = "#b87e68";
    var state = {
        colorButtons: [],
        colorNames: ["Background", "Outline", "Highlight", "Midtone", "Accent"],
        colors: ["#00000000", defaultColor1, defaultColor2, defaultColor3, defaultColor4],
        addColorButton: undefined,
        removeColorButton: undefined,
        dialog: new Dialog(),
        sep: tiled.platform == "windows" ? "\\": "/"       
    };
    // get the image from this same directory
    state.baseImagePath= f.substring(0, f.lastIndexOf("/")) + state.sep + "tiledbear.png";
    tiled.log(`Loading base image ${state.baseImagePath}`);
    var baseImage = new Image(state.baseImagePath);
    state.imgWidth = baseImage.width;
    state.imgHeight = baseImage.height;
    state.imgData = [];
    for (var y = 0; y < baseImage.height; y++) {
        for (var x = 0; x < baseImage.width; x++) {
            var pixelColor = baseImage.pixelColor(x, y);
            var colorIndex = state.colors.indexOf(pixelColor.toString());
            var colorCode = colorIndex >= 0 ? colorIndex : 0;
            state.imgData.push(colorCode);
        }
    }
    DynamicImageDialog.drawUI(state);

});
DynamicImageDialog.testPromptAction.text = "Dynamic Image Dialog";

tiled.extendMenu("Edit", [
    { action: "DynamicImageDialog", before: "SelectAll" },
    { separator: true }
]);
