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
var ListView_1 = require("./root/ListView");
var EmailListItem_1 = require("./items/EmailListItem");
var EmailListView = (function (_super) {
    __extends(EmailListView, _super);
    function EmailListView(nodeID) {
        return _super.call(this, nodeID) || this;
    }
    EmailListView.prototype.createNewEmailEntry = function () {
        this.addItems(new EmailListItem_1.default());
    };
    EmailListView.prototype.isEmpty = function () {
        return this.items.length == 0;
    };
    EmailListView.prototype.getvalues = function () {
        var result = [];
        for (var _i = 0, _a = this.items; _i < _a.length; _i++) {
            var item = _a[_i];
            result.push(item.getValue());
        }
        return result;
    };
    return EmailListView;
}(ListView_1.default));
exports.default = EmailListView;
