/* 	Advanced scripting prompt test script
*/

var SimpleDialog = {};

SimpleDialog.testPromptAction = tiled.registerAction("SimpleDialog", function (action) {

    var dialog = new Dialog();
    dialog.setTitle("Simple Dialog");
    dialog.addLabel(
        `This is my label
I put my words on it.
    `, true);
    var doubleInput = dialog.addNumberInput("Your number");
    for(const myKey of Object.keys(doubleInput.mainWidget)){
        tiled.log(`double input widget key ${myKey}`);
    }
    doubleInput.mainWidget.valueChanged.connect((newValue) => {
        tiled.log(`The new double value is ${newValue}`)
    });
    dialog.show();
});
SimpleDialog.testPromptAction.text = "Simple Dialog";

tiled.extendMenu("Edit", [
    { action: "SimpleDialog", before: "SelectAll" },
    { separator: true }
]);
