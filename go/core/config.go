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
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
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
						"title": "Ceo Name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "company_name",
						"title": "Company Name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "compensation",
						"title": "Compensation",
						"type": "`$NUMBER`",
						"format": "double",
					},
					map[string]any{
						"name": "performance_score",
						"title": "Performance Score",
						"type": "`$NUMBER`",
						"format": "double",
					},
					map[string]any{
						"name": "tenure_years",
						"title": "Tenure Years",
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
								"kind": "http",
								"method": "GET",
								"orig": "/metrics/ceo-performance",
								"segments": []any{
									map[string]any{
										"lit": "metrics",
									},
									map[string]any{
										"lit": "ceo-performance",
									},
								},
								"parts": []any{
									"metrics",
									"ceo-performance",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "order",
											"orig": "order",
											"type": "`$STRING`",
											"kind": "query",
											"example": "desc",
										},
										map[string]any{
											"name": "sort_by",
											"orig": "sort_by",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"order",
										"sort_by",
									},
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
						"title": "Ceo Compensation",
						"type": "`$NUMBER`",
						"short": "Total CEO compensation",
						"format": "double",
					},
					map[string]any{
						"name": "ceo_name",
						"title": "Ceo Name",
						"type": "`$STRING`",
						"short": "Name of the CEO",
					},
					map[string]any{
						"name": "company_name",
						"title": "Company Name",
						"type": "`$STRING`",
						"short": "Name of the company",
					},
					map[string]any{
						"name": "efficiency_rating",
						"title": "Efficiency Rating",
						"type": "`$NUMBER`",
						"short": "Compensation efficiency rating",
						"format": "double",
					},
					map[string]any{
						"name": "employees",
						"title": "Employees",
						"type": "`$INTEGER`",
						"short": "Number of employees",
					},
					map[string]any{
						"name": "headquarters",
						"title": "Headquarters",
						"type": "`$STRING`",
						"short": "Company headquarters location",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"short": "Unique identifier for the company",
					},
					map[string]any{
						"name": "industry",
						"title": "Industry",
						"type": "`$STRING`",
						"short": "Industry sector",
					},
					map[string]any{
						"name": "performance_metrics",
						"title": "Performance Metrics",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "performance_score",
						"title": "Performance Score",
						"type": "`$NUMBER`",
						"short": "Overall performance score",
						"format": "double",
					},
					map[string]any{
						"name": "revenue",
						"title": "Revenue",
						"type": "`$NUMBER`",
						"short": "Annual revenue",
						"format": "double",
					},
					map[string]any{
						"name": "revenue_growth",
						"title": "Revenue Growth",
						"type": "`$NUMBER`",
						"short": "Revenue growth percentage",
						"format": "double",
					},
					map[string]any{
						"name": "stock_performance",
						"title": "Stock Performance",
						"type": "`$NUMBER`",
						"short": "Stock performance percentage",
						"format": "double",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "company",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/companies",
								"segments": []any{
									map[string]any{
										"lit": "companies",
									},
								},
								"parts": []any{
									"companies",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.companies`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 100,
										},
										map[string]any{
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 0,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"limit",
										"offset",
									},
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/companies/{companyId}",
								"segments": []any{
									map[string]any{
										"lit": "companies",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"companies",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"companyId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.performance_metrics`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "company_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
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
						"title": "Ceo Name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "company_name",
						"title": "Company Name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "efficiency_ratio",
						"title": "Efficiency Ratio",
						"type": "`$NUMBER`",
						"short": "Performance per compensation dollar",
						"format": "double",
					},
					map[string]any{
						"name": "performance_score",
						"title": "Performance Score",
						"type": "`$NUMBER`",
						"format": "double",
					},
					map[string]any{
						"name": "total_compensation",
						"title": "Total Compensation",
						"type": "`$NUMBER`",
						"format": "double",
					},
				},
				"name": "compensation_efficiency",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/metrics/compensation-efficiency",
								"segments": []any{
									map[string]any{
										"lit": "metrics",
									},
									map[string]any{
										"lit": "compensation-efficiency",
									},
								},
								"parts": []any{
									"metrics",
									"compensation-efficiency",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
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
						"title": "Status",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "timestamp",
						"title": "Timestamp",
						"type": "`$STRING`",
						"format": "date-time",
					},
				},
				"name": "general",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/health",
								"segments": []any{
									map[string]any{
										"lit": "health",
									},
								},
								"parts": []any{
									"health",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
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
						"title": "Documentation",
						"type": "`$STRING`",
						"format": "uri",
					},
					map[string]any{
						"name": "message",
						"title": "Message",
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
								"kind": "http",
								"method": "GET",
								"orig": "/",
								"segments": []any{},
								"parts": []any{},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
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
						"title": "Ceo Compensation",
						"type": "`$NUMBER`",
						"short": "Total CEO compensation",
						"format": "double",
					},
					map[string]any{
						"name": "ceo_name",
						"title": "Ceo Name",
						"type": "`$STRING`",
						"short": "Name of the CEO",
					},
					map[string]any{
						"name": "company_name",
						"title": "Company Name",
						"type": "`$STRING`",
						"short": "Name of the company",
					},
					map[string]any{
						"name": "employees",
						"title": "Employees",
						"type": "`$INTEGER`",
						"short": "Number of employees",
					},
					map[string]any{
						"name": "headquarters",
						"title": "Headquarters",
						"type": "`$STRING`",
						"short": "Company headquarters location",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"short": "Unique identifier for the company",
					},
					map[string]any{
						"name": "industry",
						"title": "Industry",
						"type": "`$STRING`",
						"short": "Industry sector",
					},
					map[string]any{
						"name": "performance_metrics",
						"title": "Performance Metrics",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "revenue",
						"title": "Revenue",
						"type": "`$NUMBER`",
						"short": "Annual revenue",
						"format": "double",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "search",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/search",
								"segments": []any{
									map[string]any{
										"lit": "search",
									},
								},
								"parts": []any{
									"search",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.results`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "field",
											"orig": "field",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "q",
											"orig": "q",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"field",
										"q",
									},
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

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
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
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
