# Ceorater SDK configuration


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "Ceorater",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://ceorater-api.onrender.com",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "ceo_performance": {},
                "company": {},
                "compensation_efficiency": {},
                "general": {},
                "get_root": {},
                "search": {},
            },
        },
        "entity": {
      "ceo_performance": {
        "fields": [
          {
            "name": "ceo_name",
            "type": "`$STRING`",
          },
          {
            "name": "company_name",
            "type": "`$STRING`",
          },
          {
            "name": "compensation",
            "type": "`$NUMBER`",
          },
          {
            "name": "performance_score",
            "type": "`$NUMBER`",
          },
          {
            "name": "tenure_years",
            "type": "`$INTEGER`",
          },
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
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "sort_by",
                      "orig": "sort_by",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/metrics/ceo-performance",
                "parts": [
                  "metrics",
                  "ceo-performance",
                ],
                "select": {
                  "exist": [
                    "order",
                    "sort_by",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "company": {
        "fields": [
          {
            "name": "ceo_compensation",
            "type": "`$NUMBER`",
          },
          {
            "name": "ceo_name",
            "type": "`$STRING`",
          },
          {
            "name": "company_name",
            "type": "`$STRING`",
          },
          {
            "name": "efficiency_rating",
            "type": "`$NUMBER`",
          },
          {
            "name": "employees",
            "type": "`$INTEGER`",
          },
          {
            "name": "headquarters",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "type": "`$STRING`",
          },
          {
            "name": "industry",
            "type": "`$STRING`",
          },
          {
            "name": "performance_metrics",
            "type": "`$OBJECT`",
          },
          {
            "name": "performance_score",
            "type": "`$NUMBER`",
          },
          {
            "name": "revenue",
            "type": "`$NUMBER`",
          },
          {
            "name": "revenue_growth",
            "type": "`$NUMBER`",
          },
          {
            "name": "stock_performance",
            "type": "`$NUMBER`",
          },
        ],
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
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": 0,
                      "kind": "query",
                      "name": "offset",
                      "orig": "offset",
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/companies",
                "parts": [
                  "companies",
                ],
                "select": {
                  "exist": [
                    "limit",
                    "offset",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.companies`",
                },
              },
            ],
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
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/companies/{companyId}",
                "parts": [
                  "companies",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "companyId": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.performance_metrics`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "compensation_efficiency": {
        "fields": [
          {
            "name": "ceo_name",
            "type": "`$STRING`",
          },
          {
            "name": "company_name",
            "type": "`$STRING`",
          },
          {
            "name": "efficiency_ratio",
            "type": "`$NUMBER`",
          },
          {
            "name": "performance_score",
            "type": "`$NUMBER`",
          },
          {
            "name": "total_compensation",
            "type": "`$NUMBER`",
          },
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
                "parts": [
                  "metrics",
                  "compensation-efficiency",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "general": {
        "fields": [
          {
            "name": "status",
            "type": "`$STRING`",
          },
          {
            "name": "timestamp",
            "type": "`$STRING`",
          },
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
                "parts": [
                  "health",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "get_root": {
        "fields": [
          {
            "name": "documentation",
            "type": "`$STRING`",
          },
          {
            "name": "message",
            "type": "`$STRING`",
          },
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
                "parts": [],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "search": {
        "fields": [
          {
            "name": "ceo_compensation",
            "type": "`$NUMBER`",
          },
          {
            "name": "ceo_name",
            "type": "`$STRING`",
          },
          {
            "name": "company_name",
            "type": "`$STRING`",
          },
          {
            "name": "employees",
            "type": "`$INTEGER`",
          },
          {
            "name": "headquarters",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "type": "`$STRING`",
          },
          {
            "name": "industry",
            "type": "`$STRING`",
          },
          {
            "name": "performance_metrics",
            "type": "`$OBJECT`",
          },
          {
            "name": "revenue",
            "type": "`$NUMBER`",
          },
        ],
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
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "q",
                      "orig": "q",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/search",
                "parts": [
                  "search",
                ],
                "select": {
                  "exist": [
                    "field",
                    "q",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.results`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
