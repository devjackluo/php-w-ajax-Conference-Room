"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var InputFilters = (function () {
    function InputFilters() {
    }
    InputFilters.ANY = new RegExp("^.*$");
    InputFilters.EMPTY_STRING = new RegExp("^\s+$");
    InputFilters.EMAIL_ADDRESS = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$");
    return InputFilters;
}());
exports.InputFilters = InputFilters;
