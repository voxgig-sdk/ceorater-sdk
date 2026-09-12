"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const TestFeature_1 = require("./feature/test/TestFeature");
const FEATURE_CLASS = {
    test: TestFeature_1.TestFeature,
};
// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        // TODO: errors etc
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'Ceorater',
        slug: "ceorater",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        test: {
            "options": {
                "active": false
            },
            "transport": "base"
        },
    };
    options = {
        base: "https://ceorater-api.onrender.com",
        headers: {
            "content-type": "application/json"
        },
        entity: {
            ceo_performance: {},
            company: {},
            compensation_efficiency: {},
            general: {},
            get_root: {},
            search: {},
        }
    };
    entity = {
        "ceo_performance": {
            "fields": [
                {
                    "name": "ceo_name",
                    "type": "`$STRING`"
                },
                {
                    "name": "company_name",
                    "type": "`$STRING`"
                },
                {
                    "format": "double",
                    "name": "compensation",
                    "type": "`$NUMBER`"
                },
                {
                    "format": "double",
                    "name": "performance_score",
                    "type": "`$NUMBER`"
                },
                {
                    "name": "tenure_years",
                    "type": "`$INTEGER`"
                }
            ],
            "name": "ceo_performance",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "example": "desc",
                                        "kind": "query",
                                        "name": "order",
                                        "orig": "order",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "sort_by",
                                        "orig": "sort_by",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/metrics/ceo-performance",
                            "segments": [
                                {
                                    "lit": "metrics"
                                },
                                {
                                    "lit": "ceo-performance"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "order",
                                    "sort_by"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "metrics",
                                "ceo-performance"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "company": {
            "fields": [
                {
                    "format": "double",
                    "name": "ceo_compensation",
                    "short": "Total CEO compensation",
                    "type": "`$NUMBER`"
                },
                {
                    "name": "ceo_name",
                    "short": "Name of the CEO",
                    "type": "`$STRING`"
                },
                {
                    "name": "company_name",
                    "short": "Name of the company",
                    "type": "`$STRING`"
                },
                {
                    "format": "double",
                    "name": "efficiency_rating",
                    "short": "Compensation efficiency rating",
                    "type": "`$NUMBER`"
                },
                {
                    "name": "employees",
                    "short": "Number of employees",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "headquarters",
                    "short": "Company headquarters location",
                    "type": "`$STRING`"
                },
                {
                    "name": "id",
                    "short": "Unique identifier for the company",
                    "type": "`$STRING`"
                },
                {
                    "name": "industry",
                    "short": "Industry sector",
                    "type": "`$STRING`"
                },
                {
                    "name": "performance_metrics",
                    "type": "`$OBJECT`"
                },
                {
                    "format": "double",
                    "name": "performance_score",
                    "short": "Overall performance score",
                    "type": "`$NUMBER`"
                },
                {
                    "format": "double",
                    "name": "revenue",
                    "short": "Annual revenue",
                    "type": "`$NUMBER`"
                },
                {
                    "format": "double",
                    "name": "revenue_growth",
                    "short": "Revenue growth percentage",
                    "type": "`$NUMBER`"
                },
                {
                    "format": "double",
                    "name": "stock_performance",
                    "short": "Stock performance percentage",
                    "type": "`$NUMBER`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "company",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "example": 100,
                                        "kind": "query",
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "example": 0,
                                        "kind": "query",
                                        "name": "offset",
                                        "orig": "offset",
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/companies",
                            "segments": [
                                {
                                    "lit": "companies"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "limit",
                                    "offset"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.companies`"
                            },
                            "parts": [
                                "companies"
                            ]
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {
                                "params": [
                                    {
                                        "kind": "param",
                                        "name": "id",
                                        "orig": "company_id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/companies/{companyId}",
                            "rename": {
                                "param": {
                                    "companyId": "id"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "companies"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.performance_metrics`"
                            },
                            "parts": [
                                "companies",
                                "{id}"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "compensation_efficiency": {
            "fields": [
                {
                    "name": "ceo_name",
                    "type": "`$STRING`"
                },
                {
                    "name": "company_name",
                    "type": "`$STRING`"
                },
                {
                    "format": "double",
                    "name": "efficiency_ratio",
                    "short": "Performance per compensation dollar",
                    "type": "`$NUMBER`"
                },
                {
                    "format": "double",
                    "name": "performance_score",
                    "type": "`$NUMBER`"
                },
                {
                    "format": "double",
                    "name": "total_compensation",
                    "type": "`$NUMBER`"
                }
            ],
            "name": "compensation_efficiency",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {},
                            "kind": "http",
                            "method": "GET",
                            "orig": "/metrics/compensation-efficiency",
                            "segments": [
                                {
                                    "lit": "metrics"
                                },
                                {
                                    "lit": "compensation-efficiency"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "metrics",
                                "compensation-efficiency"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "general": {
            "fields": [
                {
                    "name": "status",
                    "type": "`$STRING`"
                },
                {
                    "format": "date-time",
                    "name": "timestamp",
                    "type": "`$STRING`"
                }
            ],
            "name": "general",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {},
                            "kind": "http",
                            "method": "GET",
                            "orig": "/health",
                            "segments": [
                                {
                                    "lit": "health"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "health"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "get_root": {
            "fields": [
                {
                    "format": "uri",
                    "name": "documentation",
                    "type": "`$STRING`"
                },
                {
                    "name": "message",
                    "type": "`$STRING`"
                }
            ],
            "name": "get_root",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {},
                            "kind": "http",
                            "method": "GET",
                            "orig": "/",
                            "segments": [],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": []
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "search": {
            "fields": [
                {
                    "format": "double",
                    "name": "ceo_compensation",
                    "short": "Total CEO compensation",
                    "type": "`$NUMBER`"
                },
                {
                    "name": "ceo_name",
                    "short": "Name of the CEO",
                    "type": "`$STRING`"
                },
                {
                    "name": "company_name",
                    "short": "Name of the company",
                    "type": "`$STRING`"
                },
                {
                    "name": "employees",
                    "short": "Number of employees",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "headquarters",
                    "short": "Company headquarters location",
                    "type": "`$STRING`"
                },
                {
                    "name": "id",
                    "short": "Unique identifier for the company",
                    "type": "`$STRING`"
                },
                {
                    "name": "industry",
                    "short": "Industry sector",
                    "type": "`$STRING`"
                },
                {
                    "name": "performance_metrics",
                    "type": "`$OBJECT`"
                },
                {
                    "format": "double",
                    "name": "revenue",
                    "short": "Annual revenue",
                    "type": "`$NUMBER`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "search",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "field",
                                        "orig": "field",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "q",
                                        "orig": "q",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/search",
                            "segments": [
                                {
                                    "lit": "search"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "field",
                                    "q"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.results`"
                            },
                            "parts": [
                                "search"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map