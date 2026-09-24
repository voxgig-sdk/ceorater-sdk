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
(0, node_test_1.describe)('CeoPerformanceEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when CEORATER_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('CEORATER_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.CeoraterSDK.test();
        const ent = testsdk.CeoPerformance();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.CEORATER_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'ceo_performance.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "ceo_name": { "a": true, "h": "Ceo Name", "n": "ceo_name", "r": false, "t": "`$STRING`", "key$": "ceo_name", "index$": 0 }, "company_name": { "a": true, "h": "Company Name", "n": "company_name", "r": false, "t": "`$STRING`", "key$": "company_name", "index$": 1 }, "compensation": { "a": true, "fo": "double", "h": "Compensation", "n": "compensation", "r": false, "t": "`$NUMBER`", "key$": "compensation", "index$": 2 }, "performance_score": { "a": true, "fo": "double", "h": "Performance Score", "n": "performance_score", "r": false, "t": "`$NUMBER`", "key$": "performance_score", "index$": 3 }, "tenure_years": { "a": true, "h": "Tenure Years", "n": "tenure_years", "r": false, "t": "`$INTEGER`", "key$": "tenure_years", "index$": 4 } }, "name": "ceo_performance", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /metrics/ceo-performance", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": "desc", "k": "query", "n": "order", "or": "order", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "query", "n": "sort_by", "or": "sort_by", "r": false, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/metrics/ceo-performance", "q": { "exist": ["order", "sort_by"] }, "r": {}, "s": [{ "lit": "metrics" }, { "lit": "ceo-performance" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "ceo_performance", "name__orig": "ceo_performance", "Name": "CeoPerformance", "name_": "ceo_performance", "name-": "ceo-performance", "NAME": "CEO_PERFORMANCE", "index$": 0 }, { "active": true, "entity": "ceo_performance", "key$": "BasicCeoPerformanceFlow", "kind": "basic", "name": "BasicCeoPerformanceFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "ceo_performance_ref01" } }], "index$": 0 }] }, 'CeoPerformance', { "GET /metrics/ceo-performance": { "protocol": "http", "operationId": "getCEOPerformanceMetrics", "responses": { "200": { "description": "Successful response with CEO performance metrics", "content": { "application/json": { "schema": { "type": "array", "items": { "type": "object", "properties": { "ceo_name": { "type": "string", "key$": "ceo_name" }, "company_name": { "type": "string", "key$": "company_name" }, "performance_score": { "type": "number", "format": "double", "key$": "performance_score" }, "compensation": { "type": "number", "format": "double", "key$": "compensation" }, "tenure_years": { "type": "integer", "key$": "tenure_years" } }, "x-ref": "#/components/schemas/CEOPerformance", "index$": 0 } } } } } }, "parameters": [{ "name": "sort_by", "in": "query", "description": "Field to sort results by", "required": false, "schema": { "type": "string", "enum": ["performance_score", "compensation", "efficiency"] }, "index$": 0 }, { "name": "order", "in": "query", "description": "Sort order", "required": false, "schema": { "type": "string", "enum": ["asc", "desc"], "default": "desc" }, "index$": 1 }], "securitySource": "unspecified" } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let ceo_performance_ref01_data = Object.values(setup.data.existing.ceo_performance)[0];
        // LIST
        const ceo_performance_ref01_ent = client.CeoPerformance();
        const ceo_performance_ref01_match = {};
        const ceo_performance_ref01_list = (await ceo_performance_ref01_ent.list(ceo_performance_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/ceo_performance/CeoPerformanceTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.CeoraterSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['ceo_performance01', 'ceo_performance02', 'ceo_performance03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'CEORATER_TEST_CEO_PERFORMANCE_ENTID': idmap,
        'CEORATER_TEST_LIVE': 'FALSE',
        'CEORATER_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['CEORATER_TEST_CEO_PERFORMANCE_ENTID'];
    const live = 'TRUE' === env.CEORATER_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['CEORATER_TEST_CEO_PERFORMANCE_ENTID'];
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
//# sourceMappingURL=CeoPerformanceEntity.test.js.map