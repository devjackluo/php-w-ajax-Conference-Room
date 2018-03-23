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
var ListItem_1 = require("./root/ListItem");
var Button_1 = require("../../button/Button");
var InputField_1 = require("../../input/InputField");
var Input_1 = require("../../input/root/Input");
var EmailListItem = (function (_super) {
    __extends(EmailListItem, _super);
    function EmailListItem() {
        var _this = _super.call(this) || this;
        _this.emailInput = new InputField_1.default("input");
        _this.closeButton = new Button_1.default("button");
        _this.emailInput.setInputValidationMode(Input_1.InputFilters.EMAIL_ADDRESS);
        _this.closeButton.setLabel("X");
        _this.addChildElements(_this.emailInput, _this.closeButton);
        return _this;
    }
    EmailListItem.prototype.getValue = function () {
        return this.node.getAttribute("value");
    };
    return EmailListItem;
}(ListItem_1.default));
exports.default = EmailListItem;
