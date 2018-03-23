"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var InputField_1 = require("./quarts/input/InputField");
var Input_1 = require("./quarts/input/root/Input");
var MAIN = (function () {
    function MAIN() {
        this.root = document.getElementById("ROOT");
        var element = new InputField_1.default();
        element.setInputValidationMode(Input_1.InputFilters.EMAIL_ADDRESS);
        element.setValue("???");
        element.setAlternateText("alternate");
        this.root.appendChild(element.getNode());
    }
    return MAIN;
}());
var app = new MAIN();
