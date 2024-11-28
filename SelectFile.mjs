/* 	Dialog test script
*/

var SelectFileDialog = {};
import {DialogUtils} from 'DialogUtils.mjs';
SelectFileDialog.testPromptAction = tiled.registerAction("SelectFileDialog", function (action) {

    var dialog = new Dialog();
    dialog.addHeading("Select your file please.", true);
    var filePicker1 = dialog.addFilePicker("Your file: ");
    filePicker1.fileUrlChanged.connect((newUrl) => {
        tiled.log(`The new file is ${filePicker1.fileUrl}`);
    });
    var secondDialog;
    var submitButton = dialog.addButton("Submit");
    submitButton.clicked.connect(() => {
        if (!secondDialog) {
            var fileSchemeReplace = tiled.platform == "windows" ? "file:///" : "file://";
            var fileUrl = filePicker1.fileUrl.toString().replace(fileSchemeReplace, "");
            var text = '';
            secondDialog = new Dialog();
            secondDialog.addLabel("File Contents (Excerpt)");
            secondDialog.addSeparator();

            try {
                var textFile = new TextFile(fileUrl, TextFile.ReadOnly);
                text = textFile.readAll();
                // take an excerpt of the file contents to display
                text = text.substring(0, Math.min(text.length, 255));
                textFile.close();
            }
            catch (e) {
                text = `Couldn't read your file ${fileUrl}:\n${e.message}`;
            }
            secondDialog.finished.connect(() => {
                secondDialog = undefined;
            });
            secondDialog.addHeading(text, true);
            secondDialog.show();
        } else {
            tiled.log("Second dialog already open.")
        }
    });

    dialog.finished.connect(() => {
        if (secondDialog) {
            secondDialog.accept();
        }
    });
    dialog.show();
});
SelectFileDialog.testPromptAction.text = "Select File Dialog";

tiled.extendMenu("Edit", [
    { action: "SelectFileDialog", before: "SelectAll" },
    { separator: true }
]);
