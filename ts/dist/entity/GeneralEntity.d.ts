import { CeoraterEntityBase } from '../CeoraterEntityBase';
import type { CeoraterSDK } from '../CeoraterSDK';
import type { Control } from '../types';
import type { General, GeneralLoadMatch } from '../CeoraterTypes';
declare class GeneralEntity extends CeoraterEntityBase<General> {
    constructor(client: CeoraterSDK, entopts: any);
    make(this: GeneralEntity): GeneralEntity;
    load(this: any, reqmatch?: GeneralLoadMatch, ctrl?: Control): Promise<GeneralEntity>;
}
export { GeneralEntity };
