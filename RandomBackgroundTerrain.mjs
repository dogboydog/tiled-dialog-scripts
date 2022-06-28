/* 	Advanced scripting prompt test script
*/
var RandomBackgroundTerrain = {};
import {DialogUtils} from 'DialogUtils.mjs';

RandomBackgroundTerrain.testPromptAction = tiled.registerAction("RandomBackgroundTerrain", function (action) {

    var dialog = new Dialog("Random Background Terrain");
    var state = {
        terrain: true,
        tiles: true
    };
    var mainLabel = dialog.addHeading("Random Background Terrain", true);
    dialog.addSeparator("Generation Options");
    dialog.addNewRow();
    dialog.addHeading("Size ");
    var sizeXInput = dialog.addNumberInput("X:");
    sizeXInput.decimals = 0;
    DialogUtils.watchForStateChange(sizeXInput, "sizeX", state);
    var sizeYInput = dialog.addNumberInput("Y:");
    sizeYInput.decimals = 0;
    DialogUtils.watchForStateChange(sizeYInput, "sizeY", state);
    dialog.addNewRow();
    dialog.addHeading("Terrain ");
    var terrainMinInput = dialog.addNumberInput("min:");
    terrainMinInput.decimals = 0;
    DialogUtils.watchForStateChange(terrainMinInput, "terrainMin:", state);
    // sizeXInput.setDecimals(0);
    var terrainMaxInput = dialog.addNumberInput("max");
    terrainMaxInput.decimals = 0;
    DialogUtils.watchForStateChange(terrainMaxInput, "terrainMax", state);
    var globalSmoothnessSlider = dialog.addSlider("Global smoothness:");
    DialogUtils.watchForStateChange(globalSmoothnessSlider, "globalSmoothness", state);
    globalSmoothnessSlider.toolTip = "Probability that the global slope will change direction. High = flatter terrain.";
    dialog.addNewRow();
    var localSmoothnessSlider = dialog.addSlider("Local smoothness:");
    DialogUtils.watchForStateChange(localSmoothnessSlider, "localSmoothness", state);
    localSmoothnessSlider.toolTip = "How much to favor gentle slopes over steepr ones";

    var cliffHeightInput = dialog.addNumberInput("Cliff height:");
    cliffHeightInput.decimals = 0;
    DialogUtils.watchForStateChange(cliffHeightInput, "cliffHeight", state);
    var exponentInput = dialog.addNumberInput("Exponent:");
    exponentInput.decimals = 0;
    DialogUtils.watchForStateChange(exponentInput, "exponent", state);

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
