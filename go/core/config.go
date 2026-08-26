package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "Ceorater",
			"slug": "ceorater",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"transport": "base",
			},
		},
		"options": map[string]any{
			"base": "https://ceorater-api.onrender.com",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"ceo_performance": map[string]any{},
				"company": map[string]any{},
				"compensation_efficiency": map[string]any{},
				"general": map[string]any{},
				"get_root": map[string]any{},
				"search": map[string]any{},
			},
		},
		"entity": map[string]any{
			"ceo_performance": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "ceo_name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "company_name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "compensation",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "performance_score",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "tenure_years",
						"type": "`$INTEGER`",
					},
				},
				"name": "ceo_performance",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "desc",
											"kind": "query",
											"name": "order",
											"orig": "order",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "sort_by",
											"orig": "sort_by",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/metrics/ceo-performance",
								"parts": []any{
									"metrics",
									"ceo-performance",
								},
								"select": map[string]any{
									"exist": []any{
										"order",
										"sort_by",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"company": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "ceo_compensation",
						"short": "Total CEO compensation",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "ceo_name",
						"short": "Name of the CEO",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "company_name",
						"short": "Name of the company",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "efficiency_rating",
						"short": "Compensation efficiency rating",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "employees",
						"short": "Number of employees",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "headquarters",
						"short": "Company headquarters location",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "Unique identifier for the company",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "industry",
						"short": "Industry sector",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "performance_metrics",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "performance_score",
						"short": "Overall performance score",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "revenue",
						"short": "Annual revenue",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "revenue_growth",
						"short": "Revenue growth percentage",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "stock_performance",
						"short": "Stock performance percentage",
						"type": "`$NUMBER`",
					},
				},
				"name": "company",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": 100,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/companies",
								"parts": []any{
									"companies",
								},
								"select": map[string]any{
									"exist": []any{
										"limit",
										"offset",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.companies`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "company_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/companies/{companyId}",
								"parts": []any{
									"companies",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"companyId": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.performance_metrics`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"compensation_efficiency": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "ceo_name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "company_name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "efficiency_ratio",
						"short": "Performance per compensation dollar",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "performance_score",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "total_compensation",
						"type": "`$NUMBER`",
					},
				},
				"name": "compensation_efficiency",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/metrics/compensation-efficiency",
								"parts": []any{
									"metrics",
									"compensation-efficiency",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"general": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "status",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "timestamp",
						"type": "`$STRING`",
					},
				},
				"name": "general",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/health",
								"parts": []any{
									"health",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"get_root": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "documentation",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "message",
						"type": "`$STRING`",
					},
				},
				"name": "get_root",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/",
								"parts": []any{},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"search": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "ceo_compensation",
						"short": "Total CEO compensation",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "ceo_name",
						"short": "Name of the CEO",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "company_name",
						"short": "Name of the company",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "employees",
						"short": "Number of employees",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "headquarters",
						"short": "Company headquarters location",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "Unique identifier for the company",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "industry",
						"short": "Industry sector",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "performance_metrics",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "revenue",
						"short": "Annual revenue",
						"type": "`$NUMBER`",
					},
				},
				"name": "search",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "field",
											"orig": "field",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "q",
											"orig": "q",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/search",
								"parts": []any{
									"search",
								},
								"select": map[string]any{
									"exist": []any{
										"field",
										"q",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.results`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
