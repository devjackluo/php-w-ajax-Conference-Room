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
var Element_1 = require("../../Element");
var ListView = (function (_super) {
    __extends(ListView, _super);
    function ListView(nodeID) {
        var _this = _super.call(this, nodeID) || this;
        _this.items = [];
        return _this;
    }
    ListView.prototype.addItems = function () {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        for (var _a = 0, items_1 = items; _a < items_1.length; _a++) {
            var item = items_1[_a];
            this.items.push(item);
            this.addChildElements(item);
            item.setIndex(this.items.length - 1);
        }
        if (items.length > 0) {
            this.node.scrollTo(items[0].getNode());
        }
    };
    ListView.prototype.removeItemAtIndex = function (index) {
        if (index >= 0 && index < this.items.length) {
            this.removeChildElement(this.items.splice(index, 1)[0]);
            for (var itemIndex = index; itemIndex < this.items.length; itemIndex++) {
                this.items[itemIndex].setIndex(itemIndex);
            }
        }
    };
    ListView.prototype.clear = function () {
        for (var _i = 0, _a = this.items; _i < _a.length; _i++) {
            var item = _a[_i];
            this.removeChildElement(item);
        }
        this.items = [];
    };
    return ListView;
}(Element_1.default));
exports.default = ListView;
