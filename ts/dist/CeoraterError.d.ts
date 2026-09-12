import { Context } from './Context';
declare class CeoraterError extends Error {
    isCeoraterError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { CeoraterError };
