


var SimpleImageDialog = {};

SimpleImageDialog.testPromptAction = tiled.registerAction("SimpleImageDialog", function (action) {

    var dialog = new Dialog();
    dialog.addHeading(
        `Check out this image from OpenGameArt`, true);
    var image = dialog.addImage('', new Image('/home/chris/Downloads/characters.png'));
    tiled.log(`Image format ${image.image.format}`);
    dialog.addHeading("Change the image");
    var changeButton = dialog.addButton("Change");
    changeButton.clicked.connect(()=>{
        image.image = new Image('/home/chris/Downloads/Fumiko.png');
    });
    dialog.show();
});
SimpleImageDialog.testPromptAction.text = "Simple Image Dialog";

tiled.extendMenu("Edit", [
    { action: "SimpleImageDialog", before: "SelectAll" },
    { separator: true }
]);
