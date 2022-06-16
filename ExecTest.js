/* 	How to respond to a dialog being closed.
*/

var ExecTest = {};

ExecTest.testPromptAction = tiled.registerAction("ExecTest", function (action) {
    var state = {};
    function watchForStateChange(widget, stateKey) {

        if (widget.valueChanged) {
            widget.valueChanged.connect((newValue) => {
                tiled.log(`The new ${stateKey} value is ${newValue}`);
                state[stateKey] = newValue;
            });
        }
        if (widget.colorChanged) {
            widget.colorChanged.connect((newValue) => {
                tiled.log(`The new ${stateKey} color is ${newValue}`);
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

    }
    var dialog = new Dialog("Simple Dialog");
    dialog.addHeading(
        `This is my label
I put my words on it.
    `, true);
    var doubleInput = dialog.addNumberInput("Your number");
    watchForStateChange(doubleInput, "doubleInput");

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
