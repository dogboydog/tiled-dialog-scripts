export let DialogUtils = {};
DialogUtils.watchForStateChange = function (widget, stateKey, state) {

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
    if (widget.textChanged) {
        widget.textChanged.connect((newValue) => {
            tiled.log(`The new ${stateKey} text is ${newValue}`);
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
};