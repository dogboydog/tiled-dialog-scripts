/* 	
 * Radio button group example
*/

var RadioButtonsAction = {};
RadioButtonsAction.testPromptAction = tiled.registerAction("RadioButtons", function (action) {
    var dialog = new Dialog();
    dialog.addHeading(
        `Choose the fruit`, true);
    var radioGroup = dialog.addRadioButtonGroup("Your fruit:", ["Lemon", "Apple", "Pear"], 'Your favorite fruit selection.',
        ['Lemon: A sour, yellow fruit.', 'Apple: Many varieties varying in sweetness and tartness.', 'Pear:Uniquely shaped fruit.']);
    radioGroup.addItem('Strawberry', 'Red, seed-filled, delicious fruit');
    radioGroup.idToggled.connect(function (id, checked) {
        if (!checked) {
            return;
        }
        tiled.log(`Something was clicked. ID: ${id}. Checked: ${checked} Checked button: ${radioGroup.checkedButton.text}`);
        tiled.log(`Checked index: ${radioGroup.checkedIndex}`)
    })
    
    tiled.log(`Buttons: ${radioGroup.buttons}`)
    tiled.log(`First button: ${radioGroup.buttons[0].text}`)
    // radioGroup.buttons[0].checked = true;
    tiled.log(`Checked index with nothing checked: ${radioGroup.checkedIndex}`)
    var forceAppleButton = dialog.addButton('Force apple selection');
    forceAppleButton.clicked.connect(function(){
        radioGroup.buttons[1].checked = true;
    })
    dialog.show();
});
RadioButtonsAction.testPromptAction.text = "Radio Buttons";

tiled.extendMenu("Edit", [
    { action: "RadioButtons", before: "SelectAll" },
    { separator: true }
]);
