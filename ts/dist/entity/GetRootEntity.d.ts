import { CeoraterEntityBase } from '../CeoraterEntityBase';
import type { CeoraterSDK } from '../CeoraterSDK';
import type { Control } from '../types';
import type { GetRoot, GetRootLoadMatch } from '../CeoraterTypes';
declare class GetRootEntity extends CeoraterEntityBase<GetRoot> {
    constructor(client: CeoraterSDK, entopts: any);
    make(this: GetRootEntity): GetRootEntity;
    load(this: any, reqmatch?: GetRootLoadMatch, ctrl?: Control): Promise<GetRootEntity>;
}
export { GetRootEntity };
