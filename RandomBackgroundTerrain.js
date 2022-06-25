/* 	Advanced scripting prompt test script
*/
// https://cdn.discordapp.com/attachments/984810493124423730/984961513351704636/unknown.png 
var RandomBackgroundTerrain = {};


RandomBackgroundTerrain.testPromptAction = tiled.registerAction("RandomBackgroundTerrain", function (action) {

    var dialog = new Dialog("Random Background Terrain");
    var state = {
        terrain: true,
        tiles: true
    };
    function watchForStateChange(widget, stateKey) {

        if (widget.valueChanged) {
            widget.valueChanged.connect((newValue) => {
                tiled.log(`The new ${stateKey} value is ${newValue}`);
                state[stateKey] = widget.value;
            });
        }
        if (widget.colorChanged) {
            widget.colorChanged.connect((newValue) => {
                tiled.log(`The new ${stateKey} color is ${newValue}`);
                state[stateKey] = newValue;
            });
        }
        if (widget.currentTextChanged) {
            widget.currentTextChanged.connect((newValue) => {
                tiled.log(`The new ${stateKey} text is ${newValue}`);
                state[stateKey] = newValue;
            });
        }


        if (widget.stateChanged) {
            widget.stateChanged.connect((newValue) => {
                tiled.log(`The new ${stateKey} value is ${newValue}`);
                state[stateKey] = newValue;
            });
        }

    }
    var mainLabel = dialog.addHeading("Random Background Terrain", true);
    dialog.addSeparator("Generation Options");
    dialog.addNewRow();
    dialog.addHeading("Size ");
    var sizeXInput = dialog.addNumberInput("X:");
    sizeXInput.decimals = 0;
    watchForStateChange(sizeXInput, "sizeX");
    var sizeYInput = dialog.addNumberInput("Y:");
    sizeYInput.decimals = 0;
    watchForStateChange(sizeYInput, "sizeY");
    dialog.addNewRow();
    dialog.addHeading("Terrain ");
    var terrainMinInput = dialog.addNumberInput("min:");
    terrainMinInput.decimals = 0;
    watchForStateChange(terrainMinInput, "terrainMin:");
    // sizeXInput.setDecimals(0);
    var terrainMaxInput = dialog.addNumberInput("max");
    terrainMaxInput.decimals = 0;
    watchForStateChange(terrainMaxInput, "terrainMax");
    var globalSmoothnessSlider = dialog.addSlider("Global smoothness:");
    watchForStateChange(globalSmoothnessSlider, "globalSmoothness");
    globalSmoothnessSlider.toolTip = "Probability that the global slope will change direction. High = flatter terrain.";
    dialog.addNewRow();
    var localSmoothnessSlider = dialog.addSlider("Local smoothness:");
    watchForStateChange(localSmoothnessSlider, "localSmoothness");
    localSmoothnessSlider.toolTip = "How much to favor gentle slopes over steepr ones";

    var cliffHeightInput = dialog.addNumberInput("Cliff height:");
    cliffHeightInput.decimals = 0;
    watchForStateChange(cliffHeightInput, "cliffHeight");
    var exponentInput = dialog.addNumberInput("Exponent:");
    exponentInput.decimals = 0;
    watchForStateChange(exponentInput, "exponent");

    // buttons 

    dialog.addSeparator();
    var generateButton = dialog.addButton("Generate");
    generateButton.clicked.connect(() => {
        tiled.log(`Generating...`);
        tiled.log(`Settings: ${JSON.stringify(state, null, 2)}`)
    });
    dialog.show();
});


RandomBackgroundTerrain.testPromptAction.text = "Random Background Terrain";

tiled.extendMenu("Edit", [
    { action: "RandomBackgroundTerrain", before: "SelectAll" },
    { separator: true }
]);
