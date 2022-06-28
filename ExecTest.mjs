/* 	How to respond to a dialog being closed.
*/

var ExecTest = {};
import {DialogUtils} from 'DialogUtils.mjs';
ExecTest.testPromptAction = tiled.registerAction("ExecTest", function (action) {
    var state = {};
    var dialog = new Dialog("Simple Dialog");
    dialog.addHeading(
        `This is my label
I put my words on it.
    `, true);
    var doubleInput = dialog.addNumberInput("Your number");
    DialogUtils.watchForStateChange(doubleInput, "doubleInput", state);

    var okButton = dialog.addButton("OK");
    okButton.clicked.connect(() => {
        dialog.accept();
    });
    dialog.finished.connect((result) => {
        if (result == 1) {
            tiled.log(`The dialog was accepted. Settings: ${JSON.stringify(state)}`);
        } else {
            tiled.log("The dialog was rejected");
        }
    });
    dialog.show();

});
ExecTest.testPromptAction.text = "Dialog Exec Test";

tiled.extendMenu("Edit", [
    { action: "ExecTest", before: "SelectAll" },
    { separator: true }
]);
