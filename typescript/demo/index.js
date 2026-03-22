var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
console.log("hello1");
// This is an industrial-grade general-purpose greeter function:
var greet = function (person, date) {
    console.log("Hello ".concat(person, ", today is ").concat(__spreadArray([], date, true), "!"));
};
