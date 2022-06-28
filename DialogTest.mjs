/* 	Advanced scripting prompt test script
*/

var DialogTest = {};
import {DialogUtils} from 'DialogUtils.mjs';
DialogTest.testPromptAction = tiled.registerAction("DialogTest", function (action) {
    var state = {};

    var dialog = new Dialog();
    dialog.windowTitle = "All Components Test";
    dialog.addHeading("This is a heading in a script");
    dialog.addSeparator();
    var doubleInput = dialog.addNumberInput("");
    DialogUtils.watchForStateChange(doubleInput, "doubleInput", state);
    dialog.addSeparator("Text Edit ");
    dialog.addNewRow();
    var textEdit = dialog.addTextEdit("Edit this text");
    textEdit.textChanged.connect(()=>{
        tiled.log(`The next text is:\n${textEdit.plainText}`);
    });
    dialog.addSeparator("Dropdowns ");
    dialog.addHeading("Make your choice: ");
    var comboBox = dialog.addComboBox("", ["hamburger", "hot dog", "carrot"]);

    comboBox.toolTip = "your lunch";
    DialogUtils.watchForStateChange(comboBox, "comboBox", state);
    dialog.addNewRow();
    var comboBox2 = dialog.addComboBox("Choose your 2nd pet:", ["frog", "cat", "turtle"]);
    DialogUtils.watchForStateChange(comboBox2, "comboBox2", state);
    dialog.addSeparator("Check Boxes");
    var checkBox1 = dialog.addCheckBox("Check Box 1", false);
    DialogUtils.watchForStateChange(checkBox1, "checkBox1", state);
    var colorButton = dialog.addColorButton("Pick a color:");
    colorButton.color = "#bb12cc"
    colorButton.toolTip = "This is your color.";
    DialogUtils.watchForStateChange(colorButton, 'colorButton', state);
    dialog.addHeading("Select your file please.", true);
    var filePicker1 = dialog.addFilePicker("Your file: ");
    filePicker1.fileUrlChanged.connect((newUrl) => {
        tiled.log(`The new file is ${filePicker1.fileUrl}`);
    });
    dialog.addHeading(
        `Please enter your important second value. 
This value will determine everything that happens to you from now on.
So make sure you enter it correctly.
    `, true);
    var doubleInput2 = dialog.addNumberInput("");
    doubleInput2.suffix = " kWh";
    DialogUtils.watchForStateChange(doubleInput2, "doubleInput2", state);

    var slider1 = dialog.addSlider("Slide this");
    slider1.minimum = 1;
    slider1.maximum = 10;
    DialogUtils.watchForStateChange(slider1, "slider1", state);
    var doubleInput = dialog.addNumberInput("");
   // doubleInput.prefix ="$";
    doubleInput.decimals = 2;
    tiled.log(`Double input value ${doubleInput.value}`)
    DialogUtils.watchForStateChange(doubleInput, "doubleInput", state);
    var textInput = dialog.addTextInput('Name: ', 'Fred');
    textInput.placeholderText = "Name";
    DialogUtils.watchForStateChange(textInput, "textInput", state);
    var textInput2 = dialog.addTextInput('Occupation: ', '');
    DialogUtils.watchForStateChange(textInput2, "textInput2", state);
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
