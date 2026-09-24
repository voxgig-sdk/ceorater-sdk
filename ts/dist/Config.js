"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const RatelimitFeature_1 = require("./feature/ratelimit/RatelimitFeature");
const RetryFeature_1 = require("./feature/retry/RetryFeature");
const TestFeature_1 = require("./feature/test/TestFeature");
const TimeoutFeature_1 = require("./feature/timeout/TimeoutFeature");
const FEATURE_CLASS = {
    ratelimit: RatelimitFeature_1.RatelimitFeature,
    retry: RetryFeature_1.RetryFeature,
    test: TestFeature_1.TestFeature,
    timeout: TimeoutFeature_1.TimeoutFeature,
};
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
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
        ratelimit: {
            "options": {
                "active": false,
                "burst": 5,
                "rate": 5
            },
            "optspec": {
                "now": "`$FUNCTION`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        retry: {
            "options": {
                "active": false,
                "factor": 2,
                "maxDelay": 2000,
                "minDelay": 50,
                "retries": 2,
                "statuses": [
                    408,
                    425,
                    429,
                    500,
                    502,
                    503,
                    504
                ]
            },
            "optspec": {
                "jitter": "`$BOOLEAN`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        test: {
            "options": {
                "active": false
            },
            "optspec": {
                "entity": "`$MAP`",
                "net": "`$MAP`"
            },
            "strict": false,
            "transport": "base"
        },
        timeout: {
            "options": {
                "active": false,
                "ms": 30000
            },
            "optspec": {
                "clearTimer": "`$FUNCTION`",
                "setTimer": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
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
                    "title": "Ceo Name",
                    "type": "`$STRING`"
                },
                {
                    "name": "company_name",
                    "title": "Company Name",
                    "type": "`$STRING`"
                },
                {
                    "name": "compensation",
                    "title": "Compensation",
                    "type": "`$NUMBER`",
                    "format": "double"
                },
                {
                    "name": "performance_score",
                    "title": "Performance Score",
                    "type": "`$NUMBER`",
                    "format": "double"
                },
                {
                    "name": "tenure_years",
                    "title": "Tenure Years",
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
                            "parts": [
                                "metrics",
                                "ceo-performance"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "order",
                                        "orig": "order",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "desc"
                                    },
                                    {
                                        "name": "sort_by",
                                        "orig": "sort_by",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "order",
                                    "sort_by"
                                ]
                            }
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
                    "name": "ceo_compensation",
                    "title": "Ceo Compensation",
                    "type": "`$NUMBER`",
                    "short": "Total CEO compensation",
                    "format": "double"
                },
                {
                    "name": "ceo_name",
                    "title": "Ceo Name",
                    "type": "`$STRING`",
                    "short": "Name of the CEO"
                },
                {
                    "name": "company_name",
                    "title": "Company Name",
                    "type": "`$STRING`",
                    "short": "Name of the company"
                },
                {
                    "name": "efficiency_rating",
                    "title": "Efficiency Rating",
                    "type": "`$NUMBER`",
                    "short": "Compensation efficiency rating",
                    "format": "double"
                },
                {
                    "name": "employees",
                    "title": "Employees",
                    "type": "`$INTEGER`",
                    "short": "Number of employees"
                },
                {
                    "name": "headquarters",
                    "title": "Headquarters",
                    "type": "`$STRING`",
                    "short": "Company headquarters location"
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`",
                    "short": "Unique identifier for the company"
                },
                {
                    "name": "industry",
                    "title": "Industry",
                    "type": "`$STRING`",
                    "short": "Industry sector"
                },
                {
                    "name": "performance_metrics",
                    "title": "Performance Metrics",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "performance_score",
                    "title": "Performance Score",
                    "type": "`$NUMBER`",
                    "short": "Overall performance score",
                    "format": "double"
                },
                {
                    "name": "revenue",
                    "title": "Revenue",
                    "type": "`$NUMBER`",
                    "short": "Annual revenue",
                    "format": "double"
                },
                {
                    "name": "revenue_growth",
                    "title": "Revenue Growth",
                    "type": "`$NUMBER`",
                    "short": "Revenue growth percentage",
                    "format": "double"
                },
                {
                    "name": "stock_performance",
                    "title": "Stock Performance",
                    "type": "`$NUMBER`",
                    "short": "Stock performance percentage",
                    "format": "double"
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
                            "kind": "http",
                            "method": "GET",
                            "orig": "/companies",
                            "segments": [
                                {
                                    "lit": "companies"
                                }
                            ],
                            "parts": [
                                "companies"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.companies`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 100
                                    },
                                    {
                                        "name": "offset",
                                        "orig": "offset",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 0
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "limit",
                                    "offset"
                                ]
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/companies/{companyId}",
                            "segments": [
                                {
                                    "lit": "companies"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "companies",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "companyId": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.performance_metrics`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "company_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
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
                    "title": "Ceo Name",
                    "type": "`$STRING`"
                },
                {
                    "name": "company_name",
                    "title": "Company Name",
                    "type": "`$STRING`"
                },
                {
                    "name": "efficiency_ratio",
                    "title": "Efficiency Ratio",
                    "type": "`$NUMBER`",
                    "short": "Performance per compensation dollar",
                    "format": "double"
                },
                {
                    "name": "performance_score",
                    "title": "Performance Score",
                    "type": "`$NUMBER`",
                    "format": "double"
                },
                {
                    "name": "total_compensation",
                    "title": "Total Compensation",
                    "type": "`$NUMBER`",
                    "format": "double"
                }
            ],
            "name": "compensation_efficiency",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
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
                            "parts": [
                                "metrics",
                                "compensation-efficiency"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {}
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
                    "title": "Status",
                    "type": "`$STRING`"
                },
                {
                    "name": "timestamp",
                    "title": "Timestamp",
                    "type": "`$STRING`",
                    "format": "date-time"
                }
            ],
            "name": "general",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/health",
                            "segments": [
                                {
                                    "lit": "health"
                                }
                            ],
                            "parts": [
                                "health"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {}
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
                    "name": "documentation",
                    "title": "Documentation",
                    "type": "`$STRING`",
                    "format": "uri"
                },
                {
                    "name": "message",
                    "title": "Message",
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
                            "kind": "http",
                            "method": "GET",
                            "orig": "/",
                            "segments": [],
                            "parts": [],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {}
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
                    "name": "ceo_compensation",
                    "title": "Ceo Compensation",
                    "type": "`$NUMBER`",
                    "short": "Total CEO compensation",
                    "format": "double"
                },
                {
                    "name": "ceo_name",
                    "title": "Ceo Name",
                    "type": "`$STRING`",
                    "short": "Name of the CEO"
                },
                {
                    "name": "company_name",
                    "title": "Company Name",
                    "type": "`$STRING`",
                    "short": "Name of the company"
                },
                {
                    "name": "employees",
                    "title": "Employees",
                    "type": "`$INTEGER`",
                    "short": "Number of employees"
                },
                {
                    "name": "headquarters",
                    "title": "Headquarters",
                    "type": "`$STRING`",
                    "short": "Company headquarters location"
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`",
                    "short": "Unique identifier for the company"
                },
                {
                    "name": "industry",
                    "title": "Industry",
                    "type": "`$STRING`",
                    "short": "Industry sector"
                },
                {
                    "name": "performance_metrics",
                    "title": "Performance Metrics",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "revenue",
                    "title": "Revenue",
                    "type": "`$NUMBER`",
                    "short": "Annual revenue",
                    "format": "double"
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
                            "kind": "http",
                            "method": "GET",
                            "orig": "/search",
                            "segments": [
                                {
                                    "lit": "search"
                                }
                            ],
                            "parts": [
                                "search"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.results`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "field",
                                        "orig": "field",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "q",
                                        "orig": "q",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "field",
                                    "q"
                                ]
                            }
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