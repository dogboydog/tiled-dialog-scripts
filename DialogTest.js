/* 	Advanced scripting prompt test script
*/

var DialogTest = {};

DialogTest.testPromptAction = tiled.registerAction("DialogTest", function (action) {
    var state = {};
    function watchForStateChange(widget, stateKey) {
        if (widget.mainWidget){
        if (widget.mainWidget.valueChanged){
            widget.mainWidget.valueChanged.connect((newValue) => {
                tiled.log(`The new ${stateKey} value is ${newValue}`);
                state[stateKey] = newValue;
            });
        }
        if (widget.mainWidget.colorChanged){
            widget.mainWidget.colorChanged.connect((newValue) => {
                tiled.log(`The new ${stateKey} color is ${newValue}`);
                state[stateKey] = newValue;
            });
        }
        if (widget.mainWidget.currentTextChanged){
            widget.mainWidget.currentTextChanged.connect((newValue) => {
                tiled.log(`The new ${stateKey} text is ${newValue}`);
                state[stateKey] = newValue;
            });
        }
    }
    else {
        if (widget.stateChanged){
            widget.stateChanged.connect((newValue) => {
                tiled.log(`The new ${stateKey} value is ${newValue}`);
                state[stateKey] = newValue;
            });
        }
    }

    }
    var dialog = new Dialog();
    dialog.resize(450,600);
    dialog.setTitle("All Components Test");
    dialog.addLabel("This is a label in a script");
    dialog.addSeparator();
    var doubleInput = dialog.addNumberInput("");
    watchForStateChange(doubleInput, "doubleInput");
    dialog.addSeparator("Dropdowns ");
    dialog.addLabel("Make your choice: ");
    var comboBox = dialog.addComboBox("", ["hamburger", "hot dog", "carrot"]);

    comboBox.setToolTip("your lunch");
    watchForStateChange(comboBox, "comboBox");
    dialog.addNewRow();
    var comboBox2 = dialog.addComboBox("Choose your 2nd pet:", ["frog", "cat", "turtle"]);
    watchForStateChange(comboBox2, "comboBox2");
    dialog.addSeparator("Check Boxes");
    var checkBox1 = dialog.addCheckBox("Check Box 1", false);
    watchForStateChange(checkBox1, "checkBox1");
    var colorButton = dialog.addColorButton("Pick a color:");
    colorButton.mainWidget.color = "#bb12cc"
    colorButton.setToolTip("This is your color.");
    watchForStateChange(colorButton, 'colorButton');
    dialog.addLabel(
        `Please enter your important second value. 
This value will determine everything that happens to you from now on.
So make sure you enter it correctly.
    `, true);
    var doubleInput2 = dialog.addNumberInput("");
    var doubleInput = dialog.addNumberInput("");
    watchForStateChange(doubleInput2, "doubleInput2");

    var slider1 = dialog.addSlider("Slide this");
    slider1.mainWidget.minimum = 1;
    slider1.mainWidget.maximum =10;
    watchForStateChange(slider1, "slider1");
    var doubleInput = dialog.addNumberInput("");

    var secondDialog; 
    var button = dialog.addButton("Open second dialog");

    dialog.rejected.connect(()=>{
        if (secondDialog){
            secondDialog.done(Qt.Rejected);
            secondDialog = undefined;
        }
    });
    button.mainWidget.clicked.connect(()=>{
        tiled.log(`Second dialog button clicked`);
        if (!secondDialog){
            secondDialog= new Dialog(); // parent to existing dialog
            secondDialog.addLabel("This is the second dialog");
            secondDialog.setTitle("Second Window");
            secondDialog.show();

            secondDialog.rejected.connect(()=>{
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
