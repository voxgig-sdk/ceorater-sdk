import { CeoraterEntityBase } from '../CeoraterEntityBase';
import type { CeoraterSDK } from '../CeoraterSDK';
import type { Control } from '../types';
import type { Search, SearchListMatch } from '../CeoraterTypes';
declare class SearchEntity extends CeoraterEntityBase<Search> {
    constructor(client: CeoraterSDK, entopts: any);
    make(this: SearchEntity): SearchEntity;
    list(this: any, reqmatch?: SearchListMatch, ctrl?: Control): Promise<SearchEntity[]>;
}
export { SearchEntity };
