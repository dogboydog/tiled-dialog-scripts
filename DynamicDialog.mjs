/* 	Dialog test script
*/

var DynamicDialog = {};
import {DialogUtils} from 'DialogUtils.mjs';
DynamicDialog.drawUI = function (dialog, state) {
    dialog.clear();
    dialog.windowTitle = "Dynamic Dialog";
    dialog.newRowMode = Dialog.ManualRows;
    dialog.addHeading(`A dialog which changes based on user input.`, true);
    dialog.addSeparator("Color Mappings");
    dialog.addNewRow();
    for (var colorIndex = 0; colorIndex < state.colors.length; colorIndex++) {
   
        dialog.addNewRow();
        state.colorButtons[colorIndex] = dialog.addColorButton(`Color #${colorIndex}`);
        state.colors[colorIndex] = "#ffffff";
        state.colorButtons[colorIndex].colorChanged.connect((newColor) => {
            tiled.log(`Color button #${colorIndex} value changed to ${newColor}`);
            state.colors[colorIndex] = newColor;
        });


        state.tileInputs[colorIndex] = dialog.addNumberInput(`Tile ID #${colorIndex}`);
        state.tileInputs[colorIndex].decimals = 0;
        state.tileInputs[colorIndex].valueChanged.connect((newValue) => {
            tiled.log(`ID input #${colorIndex} value changed to ${newValue}`);
            state.tileIds[colorIndex] = newValue;
        });
        state.tileIds[colorIndex] = 1;
    }
    dialog.addNewRow();
    state.addColorButton = dialog.addButton("+");
    state.addColorButton.toolTip = "Add a new color-ID mapping.";
    state.addColorButton.clicked.connect(() => {
        state.colors.push("#ffffff");
        DynamicDialog.drawUI(dialog, state);
    });
    dialog.show();
};
DynamicDialog.testPromptAction = tiled.registerAction("DynamicDialog", function (action) {
    var state = {
        colorButtons: [],
        tileInputs: [],
        colors: [],
        tileIds: [],
        addColorButton: undefined,
        removeColorButton: undefined
    }
    var dialog = new Dialog();

    DynamicDialog.drawUI(dialog, state);

});
DynamicDialog.testPromptAction.text = "Dynamic Dialog";

tiled.extendMenu("Edit", [
    { action: "DynamicDialog", before: "SelectAll" },
    { separator: true }
]);
