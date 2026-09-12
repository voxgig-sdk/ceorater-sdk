import { CeoraterEntityBase } from '../CeoraterEntityBase';
import type { CeoraterSDK } from '../CeoraterSDK';
import type { Control } from '../types';
import type { CompensationEfficiency, CompensationEfficiencyListMatch } from '../CeoraterTypes';
declare class CompensationEfficiencyEntity extends CeoraterEntityBase<CompensationEfficiency> {
    constructor(client: CeoraterSDK, entopts: any);
    make(this: CompensationEfficiencyEntity): CompensationEfficiencyEntity;
    list(this: any, reqmatch?: CompensationEfficiencyListMatch, ctrl?: Control): Promise<CompensationEfficiencyEntity[]>;
}
export { CompensationEfficiencyEntity };
