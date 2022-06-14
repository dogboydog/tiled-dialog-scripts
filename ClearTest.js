/* 	Advanced scripting prompt test script
*/

var ClearTest = {};

ClearTest.testPromptAction = tiled.registerAction("ClearTest", function (action) {

    var dialog = new Dialog();

    dialog.addLabel("My cool label");
    dialog.addSeparator();
    // var sizeXInputArgs = new NumberInputArgs();
    // sizeXInputArgs.suffix ="px";
    // sizeXInputArgs.maximum = 4080;
    // sizeXInputArgs.minimum = 1;
    // sizeXInputArgs.label = "Size X:";
    // var sizeXInput = dialog.addNumberInput(sizeXInputArgs);
    
    var button = dialog.addButton("Clear");
    button.clicked.connect(()=>{
        tiled.log(`clear button clicked`);
        dialog.clear();
        dialog.addLabel("Thanks. I never liked that old label.", true);
        dialog.addNewRow();
        dialog.addSlider("Now slide this:");
    });
    dialog.show();
});
ClearTest.testPromptAction.text = "Clear Test";

tiled.extendMenu("Edit", [
    { action: "ClearTest", before: "SelectAll" },
    { separator: true }
]);
