"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('CompanyEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when CEORATER_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('CEORATER_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.CeoraterSDK.test();
        const ent = testsdk.Company();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.CEORATER_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'company.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "ceo_compensation": { "a": true, "fo": "double", "h": "Ceo Compensation", "n": "ceo_compensation", "r": false, "sh": "Total CEO compensation", "t": "`$NUMBER`", "key$": "ceo_compensation", "index$": 0 }, "ceo_name": { "a": true, "h": "Ceo Name", "n": "ceo_name", "r": false, "sh": "Name of the CEO", "t": "`$STRING`", "key$": "ceo_name", "index$": 1 }, "company_name": { "a": true, "h": "Company Name", "n": "company_name", "r": false, "sh": "Name of the company", "t": "`$STRING`", "key$": "company_name", "index$": 2 }, "efficiency_rating": { "a": true, "fo": "double", "h": "Efficiency Rating", "n": "efficiency_rating", "r": false, "sh": "Compensation efficiency rating", "t": "`$NUMBER`", "key$": "efficiency_rating", "index$": 3 }, "employees": { "a": true, "h": "Employees", "n": "employees", "r": false, "sh": "Number of employees", "t": "`$INTEGER`", "key$": "employees", "index$": 4 }, "headquarters": { "a": true, "h": "Headquarters", "n": "headquarters", "r": false, "sh": "Company headquarters location", "t": "`$STRING`", "key$": "headquarters", "index$": 5 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "sh": "Unique identifier for the company", "t": "`$STRING`", "key$": "id", "index$": 6 }, "industry": { "a": true, "h": "Industry", "n": "industry", "r": false, "sh": "Industry sector", "t": "`$STRING`", "key$": "industry", "index$": 7 }, "performance_metrics": { "a": true, "h": "Performance Metrics", "n": "performance_metrics", "r": false, "t": "`$OBJECT`", "key$": "performance_metrics", "index$": 8 }, "performance_score": { "a": true, "fo": "double", "h": "Performance Score", "n": "performance_score", "r": false, "sh": "Overall performance score", "t": "`$NUMBER`", "key$": "performance_score", "index$": 9 }, "revenue": { "a": true, "fo": "double", "h": "Revenue", "n": "revenue", "r": false, "sh": "Annual revenue", "t": "`$NUMBER`", "key$": "revenue", "index$": 10 }, "revenue_growth": { "a": true, "fo": "double", "h": "Revenue Growth", "n": "revenue_growth", "r": false, "sh": "Revenue growth percentage", "t": "`$NUMBER`", "key$": "revenue_growth", "index$": 11 }, "stock_performance": { "a": true, "fo": "double", "h": "Stock Performance", "n": "stock_performance", "r": false, "sh": "Stock performance percentage", "t": "`$NUMBER`", "key$": "stock_performance", "index$": 12 } }, "id": { "field": "id", "name": "id" }, "name": "company", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /companies", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": 100, "k": "query", "n": "limit", "or": "limit", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "ex": 0, "k": "query", "n": "offset", "or": "offset", "r": false, "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/companies", "q": { "exist": ["limit", "offset"] }, "r": {}, "s": [{ "lit": "companies" }], "t": { "req": "`reqdata`", "res": "`body.companies`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /companies/{companyId}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "company_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/companies/{companyId}", "q": { "exist": ["id"] }, "r": { "param": { "companyId": "id" } }, "s": [{ "lit": "companies" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.performance_metrics`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "company", "name__orig": "company", "Name": "Company", "name_": "company", "name-": "company", "NAME": "COMPANY", "index$": 1 }, { "active": true, "entity": "company", "key$": "BasicCompanyFlow", "kind": "basic", "name": "BasicCompanyFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "company_ref01" } }], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "company_ref01", "srcdatavar": "company_ref01_data", "suffix": "_dt0" }, "m": { "id": "company01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-company_ref01" } }], "index$": 1 }] }, 'Company', { "GET /companies": { "protocol": "http", "operationId": "getCompanies", "responses": { "200": { "description": "Successful response with list of companies", "content": { "application/json": { "schema": { "type": "object", "properties": { "companies": { "items": { "properties": { "ceo_compensation": { "description": "Total CEO compensation", "format": "double", "type": "number", "key$": "ceo_compensation" }, "ceo_name": { "description": "Name of the CEO", "type": "string", "key$": "ceo_name" }, "company_name": { "description": "Name of the company", "type": "string", "key$": "company_name" }, "employees": { "description": "Number of employees", "type": "integer", "key$": "employees" }, "headquarters": { "description": "Company headquarters location", "type": "string", "key$": "headquarters" }, "id": { "description": "Unique identifier for the company", "type": "string", "key$": "id" }, "industry": { "description": "Industry sector", "type": "string", "key$": "industry" }, "performance_metrics": { "properties": { "efficiency_rating": { "description": "Compensation efficiency rating", "format": "double", "type": "number" }, "performance_score": { "description": "Overall performance score", "format": "double", "type": "number" }, "revenue_growth": { "description": "Revenue growth percentage", "format": "double", "type": "number" }, "stock_performance": { "description": "Stock performance percentage", "format": "double", "type": "number" } }, "type": "object", "x-ref": "#/components/schemas/PerformanceMetrics", "key$": "performance_metrics" }, "revenue": { "description": "Annual revenue", "format": "double", "type": "number", "key$": "revenue" } }, "type": "object", "x-ref": "#/components/schemas/Company", "index$": 0 }, "key$": "companies", "type": "array" }, "total": { "description": "Total number of companies available", "key$": "total", "type": "integer" }, "limit": { "key$": "limit", "type": "integer" }, "offset": { "key$": "offset", "type": "integer" } } } } } } }, "parameters": [{ "name": "limit", "in": "query", "description": "Maximum number of companies to return", "required": false, "schema": { "type": "integer", "default": 100, "minimum": 1, "maximum": 1000 }, "index$": 0 }, { "name": "offset", "in": "query", "description": "Number of companies to skip for pagination", "required": false, "schema": { "type": "integer", "default": 0, "minimum": 0 }, "index$": 1 }], "securitySource": "unspecified" }, "GET /companies/{companyId}": { "protocol": "http", "operationId": "getCompanyById", "responses": { "200": { "description": "Successful response with company details", "content": { "application/json": { "schema": { "type": "object", "properties": { "id": { "description": "Unique identifier for the company", "type": "string" }, "company_name": { "description": "Name of the company", "type": "string" }, "ceo_name": { "description": "Name of the CEO", "type": "string" }, "industry": { "description": "Industry sector", "type": "string" }, "headquarters": { "description": "Company headquarters location", "type": "string" }, "revenue": { "description": "Annual revenue", "format": "double", "type": "number" }, "employees": { "description": "Number of employees", "type": "integer" }, "ceo_compensation": { "description": "Total CEO compensation", "format": "double", "type": "number" }, "performance_metrics": { "properties": { "efficiency_rating": { "description": "Compensation efficiency rating", "format": "double", "type": "number", "key$": "efficiency_rating" }, "performance_score": { "description": "Overall performance score", "format": "double", "type": "number", "key$": "performance_score" }, "revenue_growth": { "description": "Revenue growth percentage", "format": "double", "type": "number", "key$": "revenue_growth" }, "stock_performance": { "description": "Stock performance percentage", "format": "double", "type": "number", "key$": "stock_performance" } }, "type": "object", "x-ref": "#/components/schemas/PerformanceMetrics", "index$": 0 } }, "x-ref": "#/components/schemas/Company" } } } }, "404": { "description": "Company not found", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string", "description": "Error message" }, "code": { "type": "string", "description": "Error code" }, "details": { "type": "string", "description": "Additional error details" } }, "x-ref": "#/components/schemas/Error" } } } } }, "parameters": [{ "name": "companyId", "in": "path", "description": "Unique identifier of the company", "required": true, "schema": { "type": "string" }, "index$": 0 }], "securitySource": "unspecified" } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let company_ref01_data = Object.values(setup.data.existing.company)[0];
        // LIST
        const company_ref01_ent = client.Company();
        const company_ref01_match = {};
        const company_ref01_list = (await company_ref01_ent.list(company_ref01_match)).map((e) => e.data());
        // LOAD
        const company_ref01_match_dt0 = {};
        company_ref01_match_dt0.id = company_ref01_data.id;
        const company_ref01_data_dt0 = (await company_ref01_ent.load(company_ref01_match_dt0)).data();
        (0, node_assert_1.default)(company_ref01_data_dt0.id === company_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/company/CompanyTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.CeoraterSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['company01', 'company02', 'company03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'CEORATER_TEST_COMPANY_ENTID': idmap,
        'CEORATER_TEST_LIVE': 'FALSE',
        'CEORATER_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['CEORATER_TEST_COMPANY_ENTID'];
    const live = 'TRUE' === env.CEORATER_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['CEORATER_TEST_COMPANY_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.CeoraterSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.CEORATER_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=CompanyEntity.test.js.map