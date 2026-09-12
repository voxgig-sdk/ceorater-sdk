import { CeoraterEntityBase } from '../CeoraterEntityBase';
import type { CeoraterSDK } from '../CeoraterSDK';
import type { Control } from '../types';
import type { CeoPerformance, CeoPerformanceListMatch } from '../CeoraterTypes';
declare class CeoPerformanceEntity extends CeoraterEntityBase<CeoPerformance> {
    constructor(client: CeoraterSDK, entopts: any);
    make(this: CeoPerformanceEntity): CeoPerformanceEntity;
    list(this: any, reqmatch?: CeoPerformanceListMatch, ctrl?: Control): Promise<CeoPerformanceEntity[]>;
}
export { CeoPerformanceEntity };
