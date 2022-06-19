/* 	Advanced scripting prompt test script
*/

var TextEditHtmlDialog = {};

TextEditHtmlDialog.testPromptAction = tiled.registerAction("TextEditHtmlDialog", function (action) {

    var dialog = new Dialog();
    dialog.addHeading("Enter your text now.");
    dialog.addNewRow();
    var textEdit = dialog.addTextEdit("Edit this text");
    textEdit.readOnly = true;
    textEdit.html = 
`
<p><font size="+2">HTML Edit</font></p>
You can also use the addTextEdit() widget for display of read-only HTML.
<p align="center"><a href="https://www.mapeditor.org/">https://www.mapeditor.org/</a></p>
`;
    textEdit.textChanged.connect(()=>{
        tiled.log(`The next text is:\n${textEdit.plainText}`);
    });
    dialog.show();
});
TextEditHtmlDialog.testPromptAction.text = "TextEdit HTML Dialog";

tiled.extendMenu("Edit", [
    { action: "TextEditHtmlDialog", before: "SelectAll" },
    { separator: true }
]);
