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
var Button = (function (_super) {
    __extends(Button, _super);
    function Button(nodeID) {
        if (nodeID === void 0) { nodeID = ""; }
        return _super.call(this, nodeID, "button") || this;
    }
    Button.prototype.setLabel = function (label) {
        this.node.textContent = label;
    };
    return Button;
}(Element_1.default));
exports.default = Button;
