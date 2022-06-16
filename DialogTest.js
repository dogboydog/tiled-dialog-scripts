/* 	Advanced scripting prompt test script
*/

var DialogTest = {};

DialogTest.testPromptAction = tiled.registerAction("DialogTest", function (action) {
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


    }
    var dialog = new Dialog();
    dialog.windowTitle = "All Components Test";
    dialog.addHeading("This is a heading in a script");
    dialog.addSeparator();
    var doubleInput = dialog.addNumberInput("");
    watchForStateChange(doubleInput, "doubleInput");
    dialog.addSeparator("Dropdowns ");
    dialog.addHeading("Make your choice: ");
    var comboBox = dialog.addComboBox("", ["hamburger", "hot dog", "carrot"]);

    comboBox.toolTip = "your lunch";
    watchForStateChange(comboBox, "comboBox");
    dialog.addNewRow();
    var comboBox2 = dialog.addComboBox("Choose your 2nd pet:", ["frog", "cat", "turtle"]);
    watchForStateChange(comboBox2, "comboBox2");
    dialog.addSeparator("Check Boxes");
    var checkBox1 = dialog.addCheckBox("Check Box 1", false);
    watchForStateChange(checkBox1, "checkBox1");
    var colorButton = dialog.addColorButton("Pick a color:");
    colorButton.color = "#bb12cc"
    colorButton.toolTip = "This is your color.";
    watchForStateChange(colorButton, 'colorButton');
    dialog.addHeading(
        `Please enter your important second value. 
This value will determine everything that happens to you from now on.
So make sure you enter it correctly.
    `, true);
    var doubleInput2 = dialog.addNumberInput("");
    doubleInput2.suffix = " kWh";
    watchForStateChange(doubleInput2, "doubleInput2");

    var slider1 = dialog.addSlider("Slide this");
    slider1.minimum = 1;
    slider1.maximum = 10;
    watchForStateChange(slider1, "slider1");
    var doubleInput = dialog.addNumberInput("");
    doubleInput.prefix ="$";
    doubleInput.decimals = 2;

    watchForStateChange(doubleInput, "doubleInput");
    var textInput = dialog.addTextInput('Name: ', 'Fred');
    textInput.placeholderText = "Name";
    watchForStateChange(textInput, "textInput");
    var textInput2 = dialog.addTextInput('Occupation: ', '');
    watchForStateChange(textInput2, "textInput2");
    var secondDialog;
    var button = dialog.addButton("Open second dialog");

    dialog.rejected.connect(() => {
        if (secondDialog) {
            secondDialog.done(Qt.Rejected);
            secondDialog = undefined;
        }
    });
    button.clicked.connect(() => {
        tiled.log(`Second dialog button clicked`);
        if (!secondDialog) {
            secondDialog = new Dialog("Second Window"); // parent to existing dialog
            secondDialog.addHeading("This is the second dialog");
            secondDialog.show();

            secondDialog.rejected.connect(() => {
                secondDialog = undefined;
            });
        }
    });
    dialog.show();
});
DialogTest.testPromptAction.text = "Scripted Dialog Test";

tiled.extendMenu("Edit", [
    { action: "DialogTest", before: "SelectAll" },
    { separator: true }
]);
