/* 	Advanced scripting prompt test script
*/

var TextEditDialog = {};

TextEditDialog.testPromptAction = tiled.registerAction("TextEditDialog", function (action) {

    var dialog = new Dialog();
    dialog.addHeading("Enter your text now.");
    dialog.addNewRow();
    var textEdit = dialog.addTextEdit("Edit this text");
    textEdit.textChanged.connect(()=>{
        tiled.log(`The next text is:\n${textEdit.plainText}`);
    });
    dialog.show();
});
TextEditDialog.testPromptAction.text = "TextEdit Dialog";

tiled.extendMenu("Edit", [
    { action: "TextEditDialog", before: "SelectAll" },
    { separator: true }
]);
