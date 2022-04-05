"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errMissing = exports.err = exports.ok = void 0;
function ok(res, body, debug) {
    if (debug) {
        console.log(`[RESPONSE]`, body);
    }
    return res.status(200).json(body);
}
exports.ok = ok;
function err(res, error, code = 500) {
    return res.status(code).json({ message: error.message, error });
}
exports.err = err;
function errMissing(res) {
    console.log("ERROR: MISSING REQUEST PARAMS");
    return res.status(500).json({ message: "Missing request parameter" });
}
exports.errMissing = errMissing;
