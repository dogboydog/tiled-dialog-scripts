/* 	Advanced scripting prompt test script
*/

var DialogTest = {};

DialogTest.testPromptAction = tiled.registerAction("DialogTest", function (action) {

    var dialog = new Dialog();
    dialog.setTitle("My Script");
    dialog.addLabel("This is a label in a script");
    dialog.addSeparator();
    var doubleInput = dialog.addNumberInput("");
    doubleInput.valueChanged.connect((newValue) => {
        tiled.log(`The new double value is ${newValue}`)
    });
    dialog.addSeparator("Dropdowns ");
    dialog.addLabel("Make your choice: ");
    dialog.addComboBox("", ["hamburger", "hot dog", "carrot"]);
    dialog.addNewRow();
    dialog.addComboBox("Choose your 2nd pet:", ["frog", "cat", "turtle"]);
    dialog.addSeparator();
    var colorButton = dialog.addColorButton("Pick a color:");
    colorButton.setToolTip("This is your color.");

    dialog.addLabel(
        `Please enter your important second value. 
This value will determine everything that happens to you from now on.
So make sure you enter it correctly.
    `, true);
    var doubleInput2 = dialog.addNumberInput("");
    doubleInput2.valueChanged.connect((newValue) => {
        tiled.log(`The new double value from the 2nd double input is ${newValue}`)
    });

    var slider1 = dialog.addSlider("Slide this");
    slider1.valueChanged.connect((newValue) => {
        tiled.log(`The new  value from the slider is ${newValue}`)
    });
    var secondDialog; 
    var button = dialog.addButton("Open second dialog");

    dialog.rejected.connect(()=>{
        if (secondDialog){
            secondDialog.done(Qt.Rejected);
            secondDialog = undefined;
        }
    });
    button.clicked.connect(()=>{
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
