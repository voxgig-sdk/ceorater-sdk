"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CeoraterError = void 0;
class CeoraterError extends Error {
    isCeoraterError = true;
    sdk = 'Ceorater';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.CeoraterError = CeoraterError;
//# sourceMappingURL=CeoraterError.js.map