"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalDate = void 0;
var LocalDate = /** @class */ (function () {
    function LocalDate() {
    }
    LocalDate.localDate = function () {
        return (new Date(Date.now() - this.tzoffset));
    };
    LocalDate.localISODate = function () {
        return (new Date(Date.now() - this.tzoffset)).toISOString().slice(0, -1);
    };
    LocalDate.tzoffset = (new Date()).getTimezoneOffset() * 60000;
    return LocalDate;
}());
exports.LocalDate = LocalDate;
//# sourceMappingURL=locate.date.js.map