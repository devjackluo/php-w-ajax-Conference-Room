"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Element_1 = require("../Element");
var Input_1 = require("./root/Input");
var InputField = (function (_super) {
    __extends(InputField, _super);
    function InputField(nodeID, type) {
        if (nodeID === void 0) { nodeID = ""; }
        if (type === void 0) { type = "text"; }
        var _this = _super.call(this, nodeID ? nodeID : "", "input") || this;
        _this.inputFilter = Input_1.InputFilters.ANY;
        _this.node.setAttribute("type", type);
        _this.addEventListener('keyup', function (event) { return _this.onContentModified(); });
        return _this;
    }
    InputField.prototype.setInputValidationMode = function (inputMode) {
        this.inputFilter = inputMode;
    };
    InputField.prototype.setValue = function (text) {
        if (text === void 0) { text = ""; }
        this.node.value = text;
    };
    InputField.prototype.setAlternateText = function (text) {
        this.node.setAttribute("placeholder", text);
    };
    InputField.prototype.isValid = function () {
        var currentValue = this.getValue();
        if (currentValue) {
            switch (this.inputFilter) {
                case Input_1.InputFilters.ANY: return true;
                case Input_1.InputFilters.EMPTY_STRING: return !Input_1.InputFilters.EMPTY_STRING.test(currentValue);
                case Input_1.InputFilters.EMAIL_ADDRESS: return Input_1.InputFilters.EMAIL_ADDRESS.test(currentValue);
            }
        }
        return false;
    };
    InputField.prototype.getValue = function () {
        var currentValue = this.node.value;
        return currentValue ? currentValue : "";
    };
    InputField.prototype.onContentModified = function () {
        this.modClassTags("invalid", this.isValid());
    };
    return InputField;
}(Element_1.default));
exports.default = InputField;
