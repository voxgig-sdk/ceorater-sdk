import { CeoPerformanceEntity } from './entity/CeoPerformanceEntity';
import { CompanyEntity } from './entity/CompanyEntity';
import { CompensationEfficiencyEntity } from './entity/CompensationEfficiencyEntity';
import { GeneralEntity } from './entity/GeneralEntity';
import { GetRootEntity } from './entity/GetRootEntity';
import { SearchEntity } from './entity/SearchEntity';
export type * from './CeoraterTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { CeoraterEntityBase } from './CeoraterEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class CeoraterSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    CeoPerformance(entopts?: Record<string, any>): CeoPerformanceEntity;
    Company(entopts?: Record<string, any>): CompanyEntity;
    CompensationEfficiency(entopts?: Record<string, any>): CompensationEfficiencyEntity;
    General(entopts?: Record<string, any>): GeneralEntity;
    GetRoot(entopts?: Record<string, any>): GetRootEntity;
    Search(entopts?: Record<string, any>): SearchEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): CeoraterSDK;
    tester(testopts?: any, sdkopts?: any): CeoraterSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof CeoraterSDK;
export { stdutil, config, BaseFeature, CeoraterEntityBase, CeoraterSDK, SDK, };
