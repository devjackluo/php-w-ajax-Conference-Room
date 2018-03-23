"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Element = (function () {
    function Element(nodeID, nodeType) {
        if (nodeType === void 0) { nodeType = ""; }
        this.node = null;
        if (nodeID && nodeID.match("^#\S+$") && (this.node = document.getElementById(nodeID)) == null) {
            throw 'Quartz: An element with an id of ${nodeID} is not present, dom functions will not work.';
        }
        else if (nodeType && nodeType.match("^[a-zA-Z]+")) {
            this.node = document.createElement(nodeType);
        }
        else {
            throw "Quartz: A valid node ID reference or type reference is required.";
        }
    }
    Element.prototype.modClassTags = function (tag, toRemove) {
        if (toRemove === void 0) { toRemove = false; }
        var classList = this.node.classList;
        !toRemove ? classList.add(tag) : classList.remove(tag);
    };
    Element.prototype.modStyleTags = function (tag, value) {
        if (value === void 0) { value = ""; }
        this.node.style[tag] = value;
    };
    Element.prototype.addEventListener = function (event, listener) {
        this.node.addEventListener(event, listener);
    };
    Element.prototype.addChildElements = function () {
        var elements = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            elements[_i] = arguments[_i];
        }
        for (var _a = 0, elements_1 = elements; _a < elements_1.length; _a++) {
            var element = elements_1[_a];
            this.node.appendChild(element.getNode());
        }
    };
    Element.prototype.removeEventListener = function (event, listener) {
        this.node.removeEventListener(event, listener);
    };
    Element.prototype.removeChildElement = function (element) {
        this.node.removeChild(element.getNode());
    };
    Element.prototype.setDisabled = function (isDisabled) {
        this.node.setAttribute("disabled", isDisabled ? "true" : "false");
    };
    Element.prototype.getNode = function () {
        return this.node;
    };
    return Element;
}());
exports.default = Element;
