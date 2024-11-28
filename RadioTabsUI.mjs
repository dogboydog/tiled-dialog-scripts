/* 	
 * Radio button group example
*/

var RadioTabsUIAction = {};
RadioTabsUIAction.testPromptAction = tiled.registerAction("RadioTabs", function (action) {
    var dialog = new Dialog();
    const firstTabHeader = "First Tab";
    const secondTabHeader = "Second Tab";
    const thirdTabHeader = "Third Tab";
    var radioGroup = dialog.addRadioButtonGroup("", [firstTabHeader, secondTabHeader, thirdTabHeader]);
    
    dialog.addSeparator();
    var stepLabel = dialog.addLabel("Unknown tab");
    dialog.addNewRow();
    var secondTabOnlyControl = dialog.addButton("Second step only button");
    secondTabOnlyControl.clicked.connect(function(){
        tiled.log("Clicked secondTabOnlyControl");
    })
    function drawUI(){
    
        if(radioGroup.checkedButton == null || radioGroup.checkedButton.text == firstTabHeader){
           stepLabel.text = "First tab selected";
           secondTabOnlyControl.visible = false; 
        } else {
            stepLabel.text = "Second tab selected";
            secondTabOnlyControl.visible = true;
        }

    }
    drawUI();
    radioGroup.idToggled.connect(function (id, checked) {
        if (!checked) {
            return;
        }
        tiled.log(`Something was clicked. ID: ${id}. Checked: ${checked} Checked button: ${radioGroup.checkedButton.text}`);
        drawUI();
    })
    

    radioGroup.buttons[0].checked = true;
    // could control enable/disable of steps based on UI state
    radioGroup.buttons[0].enabled = false; 
    radioGroup.buttons[1].enabled = false; 
    radioGroup.buttons[2].enabled = false; 

    var skipButton = dialog.addButton("Skip to end");
    skipButton.clicked.connect(function(){
        radioGroup.buttons[2].checked = true;
    })
    dialog.show();
});
RadioTabsUIAction.testPromptAction.text = "Radio Tabs";

tiled.extendMenu("Edit", [
    { action: "RadioTabs", before: "SelectAll" },
    { separator: true }
]);
