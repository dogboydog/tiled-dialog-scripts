/* 	Advanced scripting prompt test script
*/

var ClearTest = {};

ClearTest.testPromptAction = tiled.registerAction("ClearTest", function (action) {

    var dialog = new Dialog();

    dialog.addHeading("My cool label");
    dialog.addSeparator();

    var button = dialog.addButton("Clear");
    button.clicked.connect(()=>{
        tiled.log(`clear button clicked`);
        dialog.clear();
        dialog.addHeading("Thanks. I never liked that old label.", true);
        dialog.addNewRow();
        var slider = dialog.addSlider("Now slide this:");
        slider.valueChanged.connect((newValue)=>{
            tiled.log(`The new slider value is ${newValue}`);
        });
    });
    dialog.show();
});
ClearTest.testPromptAction.text = "Clear Test";

tiled.extendMenu("Edit", [
    { action: "ClearTest", before: "SelectAll" },
    { separator: true }
]);
