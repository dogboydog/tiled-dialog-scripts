/* 	Advanced scripting prompt test script
*/

var SimpleDialog = {};

SimpleDialog.testPromptAction = tiled.registerAction("SimpleDialog", function (action) {

    var dialog = new Dialog();
    dialog.addHeading(
        `This is my label
I put my words on it.
    `, true);
    var doubleInput = dialog.addNumberInput("Your number");
    doubleInput.valueChanged.connect((newValue) => {
        tiled.log(`The new double value is ${newValue}`)
    });
    dialog.show();
});
SimpleDialog.testPromptAction.text = "Simple Dialog";

tiled.extendMenu("Edit", [
    { action: "SimpleDialog", before: "SelectAll" },
    { separator: true }
]);
