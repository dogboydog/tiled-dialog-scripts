/* 	Advanced scripting prompt test script
*/

var DialogWidgetTest = {};

DialogWidgetTest.testPromptAction = tiled.registerAction("DialogWidgetTest", function (action) {

    var dialog = new Dialog();

    dialog.addLabel("My cool label\n");
    dialog.addSeparator();
    // var sizeXInputArgs = new NumberInputArgs();
    // sizeXInputArgs.suffix ="px";
    // sizeXInputArgs.maximum = 4080;
    // sizeXInputArgs.minimum = 1;
    // sizeXInputArgs.label = "Size X:";
    // var sizeXInput = dialog.addNumberInput(sizeXInputArgs);
    
    var slider = dialog.addSlider("My slider");
    dialog.show();
});
DialogWidgetTest.testPromptAction.text = "ScriptDialogWidget Test";

tiled.extendMenu("Edit", [
    { action: "DialogWidgetTest", before: "SelectAll" },
    { separator: true }
]);
