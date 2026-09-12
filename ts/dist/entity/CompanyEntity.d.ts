import { CeoraterEntityBase } from '../CeoraterEntityBase';
import type { CeoraterSDK } from '../CeoraterSDK';
import type { Control } from '../types';
import type { Company, CompanyLoadMatch, CompanyListMatch } from '../CeoraterTypes';
declare class CompanyEntity extends CeoraterEntityBase<Company> {
    constructor(client: CeoraterSDK, entopts: any);
    make(this: CompanyEntity): CompanyEntity;
    load(this: any, reqmatch?: CompanyLoadMatch, ctrl?: Control): Promise<CompanyEntity>;
    list(this: any, reqmatch?: CompanyListMatch, ctrl?: Control): Promise<CompanyEntity[]>;
}
export { CompanyEntity };
